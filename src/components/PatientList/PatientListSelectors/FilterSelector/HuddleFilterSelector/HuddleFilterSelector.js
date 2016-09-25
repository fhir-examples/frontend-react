import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HuddleFilterDateSelector from './HuddleFilterDateSelector';
import huddleGroupProps from '../../../../../prop-types/huddle_group';

import {
  fetchHuddles,
  selectHuddleGroup
} from '../../../../../actions/huddle';

export class HuddleFilterSelector extends Component {
  componentWillMount() {
    this.props.fetchHuddles();
  }

  isSelected(huddleGroup) {
    return this.props.selectedHuddleGroup === huddleGroup;
  }

  handleInputChange(huddleGroup) {
    if (this.props.selectedHuddleGroup === huddleGroup) {
      this.props.selectHuddleGroup(null);
      return;
    }

    this.props.selectHuddleGroup(huddleGroup);
  }

  renderedHuddleDate(huddleGroup) {
    if (!this.isSelected(huddleGroup) || huddleGroup.dates.length === 0) {
      return;
    }

    return (
      <HuddleFilterDateSelector />
    );
  }

  renderedHuddle(huddleGroup) {
    return (
      <div key={huddleGroup.id} className="huddleGroup">
        <div className="control-group">
          <label htmlFor={`huddleGroup-radio-${huddleGroup.id}`}
                 className={`control control-radio`}>
            <span className="huddleGroup-name">{huddleGroup.name}</span>

            <input type="radio"
                   name="huddleGroup"
                   id={`huddleGroup-radio-${huddleGroup.id}`}
                   value={huddleGroup.id}
                   checked={this.isSelected(huddleGroup)}
                   onChange={() => this.handleInputChange(huddleGroup)} />

            <div className="control-indicator"></div>
          </label>

          {this.renderedHuddleDate(huddleGroup)}
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedHuddleGroup) {
      return (
        <div>
          <div>SELECTED HUDDLE GROUP: {this.props.selectedHuddleGroup.name}</div>
          <div>SELECTED HUDDLE: {this.props.selectedHuddle.datetime}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="huddle-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.huddles.map((huddle) => this.renderedHuddle(huddle))}
        </form>

        {/*<div className="debug">{this.debugSelected()}</div>*/}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    huddles: state.huddle.huddles,
    selectedHuddleGroup: state.huddle.selectedHuddleGroup,
    selectedHuddle: state.huddle.selectedHuddle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHuddles,
    selectHuddleGroup
  }, dispatch);
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  selectedHuddleGroup: huddleGroupProps,
  fetchHuddles: PropTypes.func.isRequired,
  selectHuddleGroup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HuddleFilterSelector);
