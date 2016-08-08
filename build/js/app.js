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

var GradeBreakdown = React.createClass({displayName: "GradeBreakdown",
  render: function() {
    return (
      React.createElement("div", {className: "col-xs-3"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("label", {htmlFor: "inputEmail", className: "control-label"}, this.props.label)
            ), 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("input", {type: "text", name: this.props.label, className: "form-control", onChange: this.props.updateGrading, placeholder: this.props.value.toFixed(1), disabled: this.props.disabled})
            )
          )
        )
      )
    )
  }
})

var TotalStats = React.createClass({displayName: "TotalStats",
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
        React.createElement(GradeBreakdown, {key: ind, label: ind, value: gradings[ind], updateGrading: this.updateGrading, disabled: disabled})
      )
      if ((count + 1) % 4 === 0) {
        rowList.push(
          React.createElement("div", {key: (count+1)/4, className: "row"}, 
          colList
          )
        )
        colList = []
      }
      count++
    }
    return React.createElement("div", null, rowList.map(function(elem) { return elem}))
  },
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "pages col-xs-12"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-xs-12"}, 
              React.createElement("div", {className: "well jumbotron page active", id: "stats"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "totals col-xs-3"}, 
                    React.createElement("p", null, "Total GPA:"), 
                    React.createElement("h4", {className: "gpa-total"}, this.props.totalStatState.gpaTotal.toFixed(1)), 
                    React.createElement("div", {className: "bottom row"}, 
                      React.createElement("div", {className: "col-xs-12 col-sm-6"}, 
                        React.createElement("p", {className: ""}, "Credits:")
                      ), 
                      React.createElement("div", {className: "col-xs-12 col-sm-6"}, 
                        React.createElement("p", {className: ""}, this.props.totalStatState.creditsTotal)
                      )
                    )
                  ), 
                  React.createElement("div", {className: "col-xs-9"}, 
                    React.createElement("div", {className: "row"}, 
                      React.createElement("div", {className: "col-xs-12"}, 
                        React.createElement("div", {className: "pull-left"}, 
                            React.createElement("p", null, "Breakdown")
                        ), 
                        React.createElement("div", {className: "pull-right", id: "edit-stats"}, 
                            React.createElement("a", {className: "btn btn-primary", onClick: this.totalStatUpdate}, this.props.totalStatState.label)
                        )
                      )
                    ), 
                    React.createElement("div", {className: "row"}, 
                      React.createElement("div", {className: "col-xs-12"}, this.createItems(this.props.gradings, this.props.totalStatState.disabled))
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  }
})

var GradeEntry = React.createClass({displayName: "GradeEntry",
  render: function() {
    return (
      React.createElement("div", {className: "row gradeentry"}, 
        React.createElement("div", {className: "col-xs-2"}, 
          React.createElement("h3", {className: "text-center"}, this.props.ind)
        ), 
        React.createElement("div", {className: "col-xs-5"}, 
          React.createElement("input", {className: "center-block text-center", placeholder: this.props.credits})
        ), 
        React.createElement("div", {className: "col-xs-5"}, 
          React.createElement("input", {className: "center-block text-center", placeholder: this.props.grade})
        )
      )
    )
  }
})

var TotalPerSem = React.createClass({displayName: "TotalPerSem",
  render: function() {
    return (
      React.createElement("div", {className: "row gradeentry"}, 
        React.createElement("div", {className: "col-xs-2"}, 
          React.createElement("h3", {className: "text-center"}, "total")
        ), 
        React.createElement("div", {className: "col-xs-5"}, 
          React.createElement("h3", {className: "center-block text-center"}, this.props.credits)
        ), 
        React.createElement("div", {className: "col-xs-5"}, 
          React.createElement("h3", {className: "center-block text-center"}, this.props.grade)
        )
      )
    )
  }
})

var SemesterStats = React.createClass({displayName: "SemesterStats",
  render: function() {
    var putList = function(list) {
      return list.map(function(elem, ind) {
          return React.createElement(GradeEntry, {key: ind+1, ind: ind+1, credits: elem.credits, grade: elem.grade})
        })
    }
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "pages col-xs-12"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-xs-12 col-sm-10 col-sm-offset-1"}, 
              React.createElement("div", {className: "well page active"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-xs-2"}, 
                    React.createElement("h3", {className: "text-center"}, "#")
                  ), 
                  React.createElement("div", {className: "col-xs-5"}, 
                    React.createElement("h3", {className: "text-center"}, "Credits")
                  ), 
                  React.createElement("div", {className: "col-xs-5"}, 
                    React.createElement("h3", {className: "text-center"}, "Grade")
                  )
                ), 
                React.createElement("hr", {className: "red-rule"}), 
                React.createElement("div", null, putList(this.props.list)), 
                React.createElement("hr", {className: "thick-rule"}), 
                React.createElement("div", null, 
                  React.createElement(TotalPerSem, {credits: this.props.totals.credits, grade: this.props.totals.gpa.toFixed(1)})
                ), 
                React.createElement("div", {className: "block-bottom"}, 
                  React.createElement("button", {className: "center-block btn btn-success pull-left"}, "Add class"), 
                  React.createElement("button", {className: "center-block btn btn-danger pull-right"}, "Remove semester"), 
                  React.createElement("div", {className: "clearfix"})
                )
              )
            )
          )
        )
      )
    )
  }
})

var AddSemButton = React.createClass({displayName: "AddSemButton",
  render: function() {
    return (
      React.createElement("a", {href: "javascript:void(0)", onClick: this.props.addNewSem, className: "btn btn-fab main-button"}, 
        React.createElement("i", {className: "material-icons", title: "Add semester"}, 
          "add"
        )
      )
    )
  }
})

var MainComponent = React.createClass({displayName: "MainComponent",
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
    console.log("Let's see what the object looks like")
    console.log(gradings)
    var currGradings = this.state.gradings
    for(grade in gradings) {
      currGradings[grade] = +gradings[grade]
    }
    this.setState({gradings: currGradings})
  },
  render: function() {
    var makeSemesters = function(semesters) {
      return semesters.map(function(elem, ind) {
        return React.createElement(SemesterStats, {key: "sem-"+ind, list: elem.classes, totals: elem.totals})
      })
    }
    return (
      React.createElement("div", null, 
        React.createElement(TotalStats, {
          gradings: this.state.gradings, 
          totalStatState: this.state.totalStatState, 
          updateGradings: this.updateGradings, 
          updateTotalStatState: this.updateTotalStatState}), 
        React.createElement("div", null, makeSemesters(this.state.semesters)), 
        React.createElement(AddSemButton, {addNewSem: this.addSemester})
      )
    )
  }
})

ReactDOM.render(
  React.createElement(MainComponent, null),
    document.getElementById('main')
)
