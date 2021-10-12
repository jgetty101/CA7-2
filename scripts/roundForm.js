/*************************************************************************
 * File: roundForm.js
 * This file defines a React controlled component for a logging a round.
 ************************************************************************/

 class RoundForm extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    this.state = {
      date: today.toISOString().substr(0, 10),
      course: "",
      type: "practice",
      submitIcon: "fa fa-save",
      submitLabel: "Log Round",
      roundHoles: "",
      roundStrokes: null,
      roundMinutes: null,
      roundSeconds: null,
      roundSGS: null,
      roundNotes: null,
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submitIcon: "fa fa-spin fa-spinner",
      submitLabel: "Saving...",
    });
    setTimeout(this.handleSubmitCallback, 1000);
  };

  handleSubmitCallback = () => {
    this.setState({ submitIcon: "fa fa-save", submitLabel: "Log Round" });
    let userRounds = localStorage.getItem("userData");
    if (userRounds == null) {
      userRounds = [];
    } else {
      userRounds = JSON.parse(userRounds);
    }
    let round = this.state;
    delete round.submitIcon;
    delete round.submitLabel;
    userRounds.push(round);
    localStorage.setItem("userData", JSON.stringify(userRounds));
    alert("localStorage: " + localStorage.getItem("userData"));
  };

  render() {
    return (
      <form id="logRoundForm" onSubmit={this.handleSubmit} noValidate>
        <div className="mb-3 centered">
          <label htmlFor="roundDate" className="form-label">
            Date:
            <input
              name="date"
              id="roundDate"
              className="form-control centered"
              type="date"
              aria-describedby="roundDateDescr"
              value={this.state.date}
              onChange={this.handleChange}
              required
            />
          </label>
          <div id="roundDateDescr" className="form-text">
            Enter a valid date
          </div>
        </div>
        <div className="mb-3 centered">
          <label htmlFor="roundCourse" className="form-label">
            Course:
            <input
              name="course"
              id="roundCourse"
              className="form-control centered"
              type="text"
              aria-describedby="roundCourseDescr"
              size="50"
              maxLength="50"
              value={this.state.course}
              onChange={this.handleChange}
              required
            />
          </label>
          <div id="roundCourseDescr" className="form-text">
            Enter a course name of at most 50 characters
          </div>
        </div>
        <div className="mb-3 centered">
          <label htmlFor="roundType">
            Type:
            <select
              name="type"
              id="roundType"
              className="form-control centered"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="practice" selected>
                Practice
              </option>
              <option value="tournament">Tournament</option>
            </select>
          </label>
        </div>
        <div class="mb-3 centered">
          <label for="roundHoles">
            Holes:
            <select
              name="roundHoles"
              id="roundHoles"
              className="form-control centered"
              value={this.state.roundHoles}
              onChange={this.handleChange}
            >
              <option value="9">9</option>
              <option value="18" selected>
                18
              </option>
            </select>
          </label>
        </div>
        <div class="mb-3 centered">
          <label for="roundStrokes">
            Strokes:
            <input
              id="roundStrokes"
              class="form-control centered"
              type="number"
              min="9"
              max="200"
              value={this.state.roundStrokes}
              aria-describedby="roundStrokesDescr"
              onChange={this.handleChange}
              required
            />
          </label>
          <div id="roundStrokesDescr" class="form-text">
            Enter a strokes value between 9 and 200
          </div>
        </div>
        <div class="mb-3 centered">
          <label for="roundTime">
            Time:
            <br />
            <input
              id="roundMinutes"
              type="number"
              size="3"
              aria-describedby="roundTimeDescr"
              min="10"
              max="400"
              value={this.state.roundMinutes}
              className="text-align: right"
              onChange={this.handleChange}
              required
            />{" "}
            :
            <input
              id="roundSeconds"
              type="number"
              size="2"
              aria-describedby="roundTimeDescr"
              min="0"
              max="60"
              value={this.state.roundSeconds}
              onChange={this.handleChange}
              required
            />
          </label>
          <div id="roundTimeDescr" class="form-text">
            Enter a minutes value between 10 and 400, and a seconds value
            between 0 and 59
          </div>
        </div>
        <div class="mb-3 centered">
          <label for="roundSGS">
            Speedgolf Score:
            <br />
            <input
              id="roundSGS"
              className="form-control centered"
              type="text"
              size="6"
              value={this.state.roundSGS}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div class="mb-3 centered">
          <label for="roundNotes">
            Notes:
            <br />
            <textarea
              id="roundNotes"
              class="form-control"
              aria-describedby="roundNotesDescr"
              rows="6"
              cols="75"
              maxlength="500"
              value={this.state.roundNotes}
              onChange={this.handleChange}
            ></textarea>
          </label>
          <div id="roundNotesDescr" class="form-text">
            Enter optional round notes of up to 500 characters
          </div>
        </div>
        <div className="centered">
          <button type="submit" className="btn-submit btn btn-primary">
            <span className={this.state.submitIcon}></span>
            &nbsp;{this.state.submitLabel}
          </button>
        </div>
      </form>
    );
  }
}

ReactDOM.render(<RoundForm />, document.getElementById("root"));
