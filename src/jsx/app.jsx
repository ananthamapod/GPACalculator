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
              <input type="text" name={this.props.item} className="form-control" placeholder={this.props.value.toFixed(1)} disabled={this.props.disabled}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var TotalStats = React.createClass({
  edit: function(e){
    var currState = this.props.totalStatState
    var label = currState.label
    var state = currState.state
    currState.label = state
    currState.state = label
    currState.disabled = !currState.disabled
    this.props.totalStatState = currState
    this.props.updateGradings()
    this.forceUpdate()
  },
  createItems: function(gradings, disabled) {
    var rowList = []
    var colList = []
    var count = 0
    for (var ind in gradings) {
      colList.push(
        <GradeBreakdown key={ind} label={ind} value={gradings[ind]} disabled={disabled}/>
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
                            <a className="btn btn-primary" onClick={this.edit}>{this.props.totalStatState.label}</a>
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
  render: function() {
    return (
      <div className="row gradeentry">
        <div className="col-xs-2">
          <h3 className="text-center">{this.props.ind}</h3>
        </div>
        <div className="col-xs-5">
          <input className="center-block text-center" placeholder={this.props.credits} />
        </div>
        <div className="col-xs-5">
          <input className="center-block text-center" placeholder={this.props.grade} />
        </div>
      </div>
    )
  }
})

var SemesterStats = React.createClass({
  render: function() {
    var putList = function(list) {
      return list.map(function(elem, ind) {
          return <GradeEntry key={ind+1} ind={ind+1} credits={elem.credits} grade={elem.grade}/>
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
                <div>{putList(this.props.list)}</div>
                <hr className="thick-rule"/>
                <div className="block-bottom">
                  <button className="center-block btn btn-success pull-left">Add class</button>
                  <button className="center-block btn btn-danger pull-right">Remove semester</button>
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
      <a href="javascript:void(0)" className="btn btn-fab main-button">
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
      grades: [new ClassGrade(),new ClassGrade(),new ClassGrade()],
      totalStatState: totalStatState
    }
  },
  updateGradings: function() {
    this.setState({called: true})
  },
  render: function() {
    return (
      <div>
        <TotalStats
          gradings={this.state.gradings}
          totalStatState={this.state.totalStatState}
          updateGradings={this.updateGradings} />
        <SemesterStats list={this.state.grades} />
        <AddSemButton />
      </div>
    )
  }
})

ReactDOM.render(
  <MainComponent />,
    document.getElementById('main')
)
