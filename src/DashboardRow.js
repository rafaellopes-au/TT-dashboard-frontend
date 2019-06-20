import React from "react";
import { Link } from "react-router-dom";

class DashboardRow extends React.Component {
  render() {
    return (
      // <tr className={this.props.tsheetData.bgLine}>
      <tr className={this.props.tsheetData.bgLine}>
        <td>{this.props.tsheetData.job}</td>
        <td>
          <Link
            to={{
              pathname: "/AllocatedHrs/" + this.props.tsheetData.jobcode
            }}
            className="nav-link"
          >
            {this.props.tsheetData.allocatedHrs}
          </Link>
        </td>
        <td>{this.props.tsheetData.countTime}</td>
        <td>{this.props.tsheetData.percentDone}%</td>
        <td>{this.props.tsheetData.whoIsWorking}</td>
      </tr>
    );
  }
  componentDidMount() {
    // this.interval = setInterval(
    //   () => this.setState({ time: Date.now() }),
    //   1000
    // );
  }
}

export default DashboardRow;
