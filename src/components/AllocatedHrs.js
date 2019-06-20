import React, { Component } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";

export default class AllocatedHrs extends Component {
  constructor(props) {
    super(props);
    this.onChangeHrs = this.onChangeHrs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      allocated_hrs: "",
      job_name: "Waiting..."
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "AllocatedHrs/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          allocated_hrs: response.data.AllocatedHrs,
          job_name: response.data.JobName
        });
        //console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeHrs(e) {
    this.setState({
      allocated_hrs: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      allocated_hrs: this.state.allocated_hrs,
      jobid: this.props.match.params.id
    };
    console.log(obj);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "AllocatedHrs/edit", obj)
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 className="mb-4">Manage Allocated Hours per Job</h3>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="row justify-content-md-center">
              <div className="form-group col-4">
                <label>
                  {this.state.job_name} ( {this.props.match.params.id} )
                </label>
                <NumberFormat
                  type="text"
                  className="form-control"
                  value={this.state.allocated_hrs}
                  onChange={this.onChangeHrs}
                  format="###:##"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Data"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
