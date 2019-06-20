import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

import Header from "./Header.js";
import DashboardRow from "./DashboardRow.js";
import AllocatedHrs from "./components/AllocatedHrs.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch();
  }

  performSearch() {
    const urlString = process.env.REACT_APP_BACKEND_URL;

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("success fetch data!");
        const results = searchResults;

        var dataRowsHtml = [];

        results.forEach(tsheetData => {
          //console.log(tsheetData.job);
          tsheetData.bgLine = "";
          
            tsheetData.percentDone > 95
              ? (tsheetData.bgLine = "bg-danger")
              : tsheetData.percentDone > 80
              ? (tsheetData.bgLine = "bg-warning")
              : (tsheetData.bgLine = "bg");
          
          dataRowsHtml.push(<DashboardRow tsheetData={tsheetData} />);
        });
        this.setState({ dataRows: dataRowsHtml });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <div className="mb-12 card">
                  <Switch>
                    <Route
                      exact
                      path="/AllocatedHrs/:id"
                      component={AllocatedHrs}
                    />
                    <Route path="/">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Job Nº</th>
                            <th scope="col">Allocated Hours</th>
                            <th scope="col">Count Time</th>
                            <th scope="col">%</th>
                            <th scope="col">Who’s Working</th>
                          </tr>
                        </thead>
                        <tbody>{this.state.dataRows}</tbody>
                      </table>
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.performSearch();
    setInterval(this.performSearch.bind(this), process.env.REACT_APP_SET_REFRESH_PAGE_INTERVAL); // 60000 = 1min // 600000 = 10 min
  }
}

export default App;
