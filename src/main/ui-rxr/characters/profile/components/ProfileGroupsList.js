import React, { Component, PropTypes } from "react";
import ProfileGroup from "./ProfileGroup";
import * as s from "../selectors";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

class ProfileGroupsListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.groups.map((group) => {
            return (
              <ProfileGroup
                key={group.id}
                title={group.title}
                entries={group.entries}
              />
            );
          })
        }
      </div>
    );
  }
}

ProfileGroupsListComponent.propTypes = {
  groups: PropTypes.array,
};

const selector = (state) => ({
  groups: s.getGroupsInOrder(state)
});

const ProfileGroupsList = connectWithState(selector)(ProfileGroupsListComponent);

export default ProfileGroupsList;
