const path = require("path");

const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const clean = require("gulp-clean");
const mocha = require("gulp-mocha");
const runSequence = require("run-sequence");
const shell = require("gulp-shell");
const runElectron = require("gulp-run-electron");

const rebuild = require("electron-rebuild").default;
const electronInstaller = require("electron-winstaller");
const winPackager = require("electron-packager");

const packageJson = require("./package.json");

const paths = {
  src: "./src",
  icons: "./src/main/ui/resources/app-icons",
  installers: "./installers",
  build: {
    root: "./build",
    app: {
      root: "./build/app",
      main: "./build/app/main",
      tests: "./build/app/test"
    },
    distribution: "./build/distribution",
    installers: "./build/distribution/installers"
  }
};

const electronVersion = packageJson.dependencies.electron;

/* Common Tasks */

gulp.task("clean-build", () => {
  return gulp.src(paths.build.root, {read: false})
    .pipe(clean());
});


/* Babel Tasks */

const babelTasks = ["babel-js-compile"];
const babelTasksDev = babelTasks.concat(["babel-js-watch"]);

gulp.task("babel-js-compile", () => {
  return gulp.src(paths.src + "/**/*.js")
    .pipe(babel({
      "presets": ["latest"],
      "plugins": [
        "transform-react-jsx",
        ["babel-plugin-transform-builtin-extend", {
          globals: ["Error", "Array"]
        }]
      ]
    }))
    .pipe(gulp.dest(paths.build.app.root));
});

gulp.task("babel-js-watch", () => {
  return gulp.watch(paths.src + "/**/*.js", ["babel-js-compile"]);
});


/* Assets Tasks */

const assetsTasks = ["assets-package-json-copy", "assets-copy"];
const assetsTasksDev = assetsTasks.concat(["assets-watch"]);
const assetsPath = paths.src + "/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,eot,ttf,woff,woff2,otf}";

gulp.task("assets-package-json-copy", () => {
  return gulp.src(["package.json"])
    .pipe(gulp.dest(paths.build.app.main));
});

gulp.task("assets-copy", () => {
  return gulp.src(assetsPath).pipe(gulp.dest(paths.build.app.root));
});

gulp.task("assets-watch", () => {
  return gulp.watch(assetsPath, ["assets-copy"]);
});


/* Tests Tasks */

const testsTasks = ["tests-execute"];
const testsTasksDev = testsTasks.concat(["tests-watch"]);

gulp.task("tests-execute", () => {
  return gulp.src(paths.build.app.tests + "/**/*.js", { read: false })
    .pipe(mocha({
      reporter: "spec"
    }));
});

gulp.task("tests-watch", () => {
  return gulp.watch(paths.build.app.tests + "/**/*.*", ["tests-execute"]);
});


/* Electron Tasks */

const electronTasks = ["electron-run", "electron-watch"];

gulp.task("electron-run", () => {
  return gulp.src(paths.build.app.main).pipe(runElectron());
});

gulp.task("electron-watch", () => {
  return gulp.watch(paths.build.app.main + "/**/*.*", ["electron-run"]);
});


/* Distribution Tasks */

gulp.task("install-production-dependencies", shell.task([
  "npm --prefix " + paths.build.app.main + " install " + paths.build.app.main + " --production"
]));

gulp.task("rebuild-production-dependencies", () => {

  const absolutePath = path.normalize(__dirname + "/" + paths.build.app.main);
  const rebuilder = rebuild(absolutePath, electronVersion, undefined, ["sqlite3"], true);

  const lifecycle = rebuilder.lifecycle;

  lifecycle.on("module-found", (moduleName) => {
    console.log("Module found: " + moduleName);
  });

  lifecycle.on("module-done", () => {
    console.log("Module done.");
  });

  return rebuilder
    .then(() => console.info("Rebuild successful."))
    .catch((e) => {
      console.error("Rebuild failed.");
      console.error(e);
    });

});

gulp.task("package-linux", shell.task([
  "electron-packager " + paths.build.app.main + " plotify " +
        "--out " + paths.build.distribution + " " +
        "--electron-version=" + electronVersion + " " +
        "--platform=linux " +
        "--arch=x64",
  "electron-installer-debian " +
        "--src " + paths.build.distribution + "/plotify-linux-x64 " +
        "--dest " + paths.build.installers + " " +
        "--arch amd64 " +
        "--config deb.json"
]));

gulp.task("package-windows", () => {

  const options = {
    dir: paths.build.app.main,
    arch: "x64",
    electronVersion: electronVersion,
    icon: paths.icons + "/64.ico",
    name: packageJson.name,
    platform: "win32",
    overwrite: true,
    out: paths.build.distribution,
    appCopyright: "Copyright (C) 2017 alpha. All rights reserved",
    win32metadata: {
      CompanyName: "alpha",
      FileDescription: packageJson.productDescription,
      ProductName: packageJson.productName,
      OriginalFilename: packageJson.productName + ".exe"
    }
  };

  winPackager(options, (err, appPaths) => {
    if (err) {
      console.log("Error packaging: " + err);
    } else {
      console.log("Successfully packaged (" + __dirname + "/" + appPaths + ")");

      console.log("Creating Windows Installer...");
      let result = electronInstaller.createWindowsInstaller({
        appDirectory: paths.build.distribution + "/plotify-win32-x64",
        outputDirectory: paths.installers + "/windows",
        authors: "alpha",
        exe: "Plotify.exe",
        noMsi: true,
        icon: paths.icons + "/64.ico",
        setupIcon: paths.icons + "/64.ico",
        iconUrl: "https://alpha.suhail.uberspace.de/releases/assets/64.ico"
      });
      return result.then(() => {
        console.log("Successfully created Windows Installer!");
      }, (e) => {
        console.log(`No dice: ${e.message}`);
      }
    );
    }
  });

});

/* Combined Tasks */

const buildTasks = babelTasks.concat(assetsTasks);
const buildTasksDev = babelTasksDev.concat(assetsTasksDev);

gulp.task("default", () => {
  runSequence("clean-build", buildTasksDev, testsTasksDev, electronTasks);
});

gulp.task("noui", () => {
  runSequence("clean-build", buildTasksDev, testsTasksDev);
});

gulp.task("test", () => {
  runSequence("clean-build", buildTasks, testsTasks);
});

gulp.task("distribution:linux", () => {
  runSequence("clean-build",
              buildTasks,
              testsTasks,
              "install-production-dependencies",
              "rebuild-production-dependencies",
              "package-linux");
});

gulp.task("distribution:windows", () => {
  runSequence("clean-build",
              buildTasks,
              testsTasks,
              "install-production-dependencies",
              "rebuild-production-dependencies",
              "package-windows");
});
