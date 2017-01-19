import React, { Component, PropTypes } from 'react'
import { Alert } from 'react-bootstrap'
import EdgeConnectionItem from './EdgeConnectionItem.react'

export default class EdgeConnection extends Component {

  constructor() {
     super();
     this._toggle = this._toggle.bind(this)

     this.state = {
       tagInput: ''
     }
  }

  render() {
    const { edges, index } = this.props;
    const length = edges.length;
    const user = edges[index].user;
    const {username, profile_image } = user;
    const createdAt = edges[index].createdAt;

    const edgesJSX = edges.map((e, i)=>{
      return i!==index?
        (
          <div>
            <EdgeConnectionItem
              profileImageUrl={e.user.profile_image}
              username={e.user.username}
              createdAt={e.createdAt}/>
          </div>
        ):null;
    })

    return (
      <div style={{display: 'block', overflow: 'hidden', border: 'none'}}>
        <div className="card-left-col"><img src="../../img/blank.png" /></div>
        <div className="card-right-col">
          <div
            title={username}
            style={{paddingLeft: '5px', display: 'inline-block', verticalAlign: 'top'}}>By:
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'top'}}>
            <EdgeConnectionItem
              profileImageUrl={profile_image}
              username={username}
              createdAt={createdAt} />
            {length>1?
            <span>
              <a href="javascript:void(0)" onClick={this._toggle} >&nbsp;and {length-1} more</a>
            </span>:null}
            {this.state.open?(edgesJSX):null}
          </div>
        </div>
      </div>
    )
  }

  _toggle(){
    this.setState({
      open:!this.state.open
    })
  }

}

EdgeConnection.propTypes = {
  index: PropTypes.number.isRequired,
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.object.isRequired,
      tags: PropTypes.array.isRequired,
      createdAt: PropTypes.number.isRequired,
    }).isRequired
  )
}
