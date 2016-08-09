"use strict"

function ClassGrade (credits, grade) {
  this.grade = grade || "A"
  this.credits = credits || 0
}

var gradings = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0
}

var totalStatState = {
  state: "Save",
  label: "Edit",
  disabled: true,
  gpaTotal: 4.0,
  creditsTotal: 0
}

var GradeBreakdown = React.createClass({
  render: function() {
    return (
      <div className="col-xs-3">
        <div className="row">
          <div className="form-group">
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="control-label">{this.props.label}</label>
            </div>
            <div className="col-md-6">
              <input type="text" name={this.props.label} className="form-control" onChange={this.props.updateGrading} placeholder={this.props.value.toFixed(1)} disabled={this.props.disabled}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var TotalStats = React.createClass({
  getInitialState: function() {
    return {
      gradings: {}
    }
  },
  totalStatUpdate: function() {
    var currState = this.props.totalStatState
    var label = currState.label
    var state = currState.state
    currState.label = state
    currState.state = label
    currState.disabled = !currState.disabled
    this.props.updateTotalStatState(currState)
    if(state === "Edit") {
      console.log("Getting updated now")
      this.props.updateGradings(this.state.gradings)
    }
  },
  updateGrading: function(e) {
    var input = e.target;
    var gradings = this.state.gradings
    gradings[input.name] = input.value
    this.setState({gradings: gradings})
  },
  createItems: function(gradings, disabled) {
    var rowList = []
    var colList = []
    var count = 0
    for (var ind in gradings) {
      colList.push(
        <GradeBreakdown key={ind} label={ind} value={gradings[ind]} updateGrading={this.updateGrading} disabled={disabled}/>
      )
      if ((count + 1) % 4 === 0) {
        rowList.push(
          <div key={(count+1)/4} className="row">
          {colList}
          </div>
        )
        colList = []
      }
      count++
    }
    return <div>{rowList.map(function(elem) { return elem})}</div>
  },
  render: function() {
    return (
      <div className="row">
        <div className="pages col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <div className="well jumbotron page active" id="stats">
                <div className="row">
                  <div className="totals col-xs-3">
                    <p>Total GPA:</p>
                    <h4 className="gpa-total">{this.props.totalStatState.gpaTotal.toFixed(1)}</h4>
                    <div className="bottom row">
                      <div className="col-xs-12 col-sm-6">
                        <p className="">Credits:</p>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <p className="">{this.props.totalStatState.creditsTotal}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-9">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="pull-left">
                            <p>Breakdown</p>
                        </div>
                        <div className="pull-right" id="edit-stats">
                            <a className="btn btn-primary" onClick={this.totalStatUpdate}>{this.props.totalStatState.label}</a>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">{this.createItems(this.props.gradings, this.props.totalStatState.disabled)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var GradeEntry = React.createClass({
  updateClass: function(e) {
    var elem = e.target
    var update = {}
    update[elem.name] = elem.value
    this.props.updateClass(this.props.ind-1, update)
  },
  render: function() {
    return (
      <div className="row gradeentry">
        <div className="col-xs-2">
          <h3 className="text-center">{this.props.ind}</h3>
        </div>
        <div className="col-xs-5">
          <input name="credits" className="center-block text-center" onChange={this.updateClass} placeholder={this.props.credits} />
        </div>
        <div className="col-xs-5">
          <input name="grade" className="center-block text-center" onChange={this.updateClass} placeholder={this.props.grade} />
        </div>
      </div>
    )
  }
})

var TotalPerSem = React.createClass({
  render: function() {
    return (
      <div className="row gradeentry">
        <div className="col-xs-2">
          <h3 className="text-center">total</h3>
        </div>
        <div className="col-xs-5">
          <h3 className="center-block text-center">{this.props.credits}</h3>
        </div>
        <div className="col-xs-5">
          <h3 className="center-block text-center">{this.props.grade}</h3>
        </div>
      </div>
    )
  }
})

var SemesterStats = React.createClass({
  getInitialState: function() {
    return {
      classes: [new ClassGrade(),new ClassGrade(),new ClassGrade()]
    }
  },
  updateClass: function(classInd, update) {
    this.props.updateSem(this.props.ind, classInd, update)
  },
  addClass: function() {
    this.props.addClass(this.props.ind)
  },
  removeSem: function() {
    this.props.removeSem(this.props.ind)
  },
  render: function() {
    var self = this
    var putList = function(classes) {
      return classes.map(function(elem, ind) {
          return <GradeEntry key={ind+1} ind={ind+1} credits={elem.credits} updateClass={self.updateClass} grade={elem.grade}/>
        })
    }
    return (
      <div className="row">
        <div className="pages col-xs-12">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1">
              <div className="well page active">
                <div className="row">
                  <div className="col-xs-2">
                    <h3 className="text-center">#</h3>
                  </div>
                  <div className="col-xs-5">
                    <h3 className="text-center">Credits</h3>
                  </div>
                  <div className="col-xs-5">
                    <h3 className="text-center">Grade</h3>
                  </div>
                </div>
                <hr className="red-rule"/>
                <div>{putList(this.props.classes)}</div>
                <hr className="thick-rule"/>
                <div>
                  <TotalPerSem credits={this.props.totals.credits} grade={this.props.totals.gpa.toFixed(1)}/>
                </div>
                <div className="block-bottom">
                  <button className="center-block btn btn-success pull-left" onClick={this.addClass}>Add class</button>
                  <button className="center-block btn btn-danger pull-right" onClick={this.removeSem}>Remove semester</button>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var AddSemButton = React.createClass({
  render: function() {
    return (
      <a href="javascript:void(0)" onClick={this.props.addNewSem} className="btn btn-fab main-button">
        <i className="material-icons" title="Add semester">
          add
        </i>
      </a>
    )
  }
})

var MainComponent = React.createClass({
  getInitialState: function() {
    return {
      gradings: gradings,

      semesters: [
        this.newSemester()
      ],
      totalStatState: totalStatState
    }
  },
  newSemester: function() {
    return {
      classes: [new ClassGrade(),new ClassGrade(),new ClassGrade()],
      totals: {
        credits: 0,
        gpa: 4.0
      }
    }
  },
  addSemester: function() {
    var semesters = this.state.semesters
    semesters.push(this.newSemester())
    this.setState({semesters: semesters})
  },
  updateTotalStatState: function(totalStatState) {
    this.setState({totalStatState: totalStatState})
  },
  updateGradings: function(gradings) {
    var currGradings = this.state.gradings
    for(var grade in gradings) {
      currGradings[grade] = +gradings[grade]
    }
    this.setState({gradings: currGradings})
  },
  updateSem: function(ind, classInd, update) {
    var self = this
    var sems = this.state.semesters
    var currSem = sems[ind]
    var currClass = currSem.classes[classInd]
    var credits = 0
    var gpa = 0
    for(var name in update) {
      currClass[name] = update[name]
    }
    currSem.classes.forEach(function(elem) {
      credits += +elem.credits
      gpa += self.state.gradings[elem.grade] * elem.credits
    })
    gpa = (credits == 0? 4.0 : gpa * 1.0 / credits)
    currSem.totals.credits = credits
    currSem.totals.gpa = gpa
    this.setState({semesters: sems})

    var totals = this.state.totalStatState
    var gpaTotal = 0
    var creditsTotal = 0
    sems.forEach(function(elem){
      gpaTotal += elem.totals.gpa * elem.totals.credits
      creditsTotal += elem.totals.credits
    })
    gpaTotal = (creditsTotal == 0? 4.0 : gpaTotal * 1.0 / creditsTotal)
    totals.gpaTotal = gpaTotal
    totals.creditsTotal = creditsTotal
    this.setState({totalStatState: totals})
  },
  addClass: function(semInd) {
    var sems = this.state.semesters
    var currSem = sems[semInd]
    currSem.classes.push(new ClassGrade())
    this.setState({semesters: sems})
  },
  removeSem: function(semInd) {
    var sems = this.state.semesters
    sems.splice(semInd, 1)
    this.setState({semesters: sems})
  },
  render: function() {
    var self = this
    var makeSemesters = function(semesters) {
      return semesters.map(function(elem, ind) {
        return (<SemesterStats
          updateSem={self.updateSem}
          addClass={self.addClass}
          removeSem={self.removeSem}
          key={"sem-"+ind}
          ind={ind}
          classes={elem.classes}
          totals={elem.totals} />)
      })
    }
    return (
      <div>
        <TotalStats
          gradings={this.state.gradings}
          totalStatState={this.state.totalStatState}
          updateGradings={this.updateGradings}
          updateTotalStatState={this.updateTotalStatState} />
        <div>{makeSemesters(this.state.semesters)}</div>
        <AddSemButton addNewSem={this.addSemester} />
      </div>
    )
  }
})

ReactDOM.render(
  <MainComponent />,
    document.getElementById('main')
)
