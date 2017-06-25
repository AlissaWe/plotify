import { describe, it } from "mocha";
import { expect } from "chai";

import reducer$ from "../../../main/ui-rxr/reducers/stories";
import actions from "../../../main/ui-rxr/reducers/stories/actions";
import * as s from "../../../main/ui/story/selectors";
import state from "../../../main/ui-rxr/initialState";

describe("ui / story / reducer-open", () => {

  describe("initial state", () => {

    it("no story should be open", () => {
      expect(s.isStoryOpen(state)).to.be.false;
    });

    it("no story should be loading", () => {
      expect(s.isStoryLoading(state)).to.be.false;
    });

    it("no story loading should be failed", () => {
      expect(s.isStoryLoadingFailed(state)).to.be.false;
    });

    it("no story loading error should be present", () => {
      expect(s.getStoryLoadingError(state)).to.be.null;
    });

    it("no story file should be set", () => {
      expect(s.getOpenStoryFile(state)).to.be.null;
    });

    it("openStory$", () => {
      const FILE = "./test.story";
      reducer$.subscribe(
        (next) => {
          console.log("onNext", next);
          return expect(next).to.equal(FILE);
        }
      );
      actions.openStory$.next(FILE);
    })

  });

});
