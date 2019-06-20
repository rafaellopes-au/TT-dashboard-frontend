import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";

import React from "react";
import "./App.css";
import Header from "./Header.js";
import DashboardData from "./DashboardData.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    const tsheetsdata = [
      {
        job: "001",
        allocatedHrs: 150,
        countTime: 75,
        whoIsWorking: "Team A",
        percentDone: 75
      },
      {
        job: "001",
        allocatedHrs: 150,
        countTime: 75,
        whoIsWorking: "Team A",
        percentDone: 75
      }
    ];

    var dataRowsHtml = [];
    tsheetsdata.forEach(tsheetsdata => {
      var $bgLine = "";
      {
        tsheetsdata.percentDone > 90
          ? ($bgLine = "bg-danger")
          : tsheetsdata.percentDone > 70
          ? ($bgLine = "bg-warning")
          : ($bgLine = "bg-white");
      }

      const creatingRow = (
        <DashboardData tsheetsdata={tsheetsdata} bgLine={$bgLine} />
      );
      dataRowsHtml.push(creatingRow);
    });

    this.state = { dataRows: dataRowsHtml };
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-12">
              <div className="mb-12 card">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Job Nº</th>
                      <th scope="col">Allocated Hours</th>
                      <th scope="col">Count Time</th>
                      <th scope="col">Who’s Working</th>
                      <th scope="col">%</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.dataRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
