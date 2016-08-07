function ClassGrade (credits, grade) {
  this.grade = grade || "A"
  this.credits = credits || 0
}

var gradings = [
  {
    label: "A+",
    value: 4.0
  },
  {
    label: "A",
    value: 4.0
  },
  {
    label: "A-",
    value: 3.7
  },
  {
    label: "B+",
    value: 3.3
  },
  {
    label: "B",
    value: 3.0
  },
  {
    label: "B-",
    value: 2.7
  },
  {
    label: "C+",
    value: 2.3
  },
  {
    label: "C",
    value: 2.0
  },
  {
    label: "C-",
    value: 1.7
  },
  {
    label: "D+",
    value: 1.3
  },
  {
    label: "D",
    value: 1.0
  },
  {
    label: "F",
    value: 0.0
  }
]

var totalStatState = {
  state: "Save",
  label: "Edit",
  disabled: true
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
              React.createElement("input", {type: "text", name: this.props.item, className: "form-control", placeholder: this.props.value.toFixed(1), disabled: this.props.disabled})
            )
          )
        )
      )
    )
  }
})

var TotalStats = React.createClass({displayName: "TotalStats",
  edit: function(e){
    var currState = this.props.totalStatState
    var label = currState.label
    var state = currState.state
    currState.label = state
    currState.state = label
    currState.disabled = !currState.disabled
    console.log(this.props.totalStatState)
    this.props.totalStatState = currState
    this.forceUpdate()
  },
  createItems: function(gradings, disabled) {
    var rowList = []
    var colList = []
    gradings.forEach(function(elem, ind, arr) {
      colList.push(
        React.createElement(GradeBreakdown, {key: ind, label: elem.label, value: elem.value, disabled: disabled})
      )
      if ((ind + 1) % 4 === 0) {
        rowList.push(
          React.createElement("div", {key: (ind+1)/4, className: "row"}, 
          colList
          )
        )
        colList = []
      }
    })
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
                    React.createElement("h4", {className: "gpa-total"}, "3.2"), 
                    React.createElement("div", {className: "bottom row"}, 
                      React.createElement("div", {className: "col-xs-12 col-sm-6"}, 
                        React.createElement("p", {className: ""}, "Credits:")
                      ), 
                      React.createElement("div", {className: "col-xs-12 col-sm-6"}, 
                        React.createElement("p", {className: ""}, "123")
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
                            React.createElement("a", {className: "btn btn-primary", onClick: this.edit}, this.props.totalStatState.label)
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
      React.createElement("a", {href: "javascript:void(0)", className: "btn btn-danger btn-fab main-button"}, 
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
      grades: [new ClassGrade(),new ClassGrade(),new ClassGrade()],
      totalStatState: totalStatState
    }
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(TotalStats, {gradings: this.state.gradings, totalStatState: this.state.totalStatState}), 
        React.createElement(SemesterStats, {list: this.state.grades}), 
        React.createElement(AddSemButton, null)
      )
    )
  }
})

ReactDOM.render(
  React.createElement(MainComponent, null),
    document.getElementById('main')
)
