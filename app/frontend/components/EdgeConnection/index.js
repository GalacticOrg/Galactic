import React, { Component, PropTypes } from 'react'
import { Alert } from 'react-bootstrap'
import EdgeConnectionItem from './EdgeConnectionItem.react'

const connectBlocksStyle= {
  display: 'inline-block',
  verticalAlign: 'top'
}

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
    const {username, profileImageUrl, twitter:{ profile_image_url } } = user;
    const createdAt = edges[index].createdAt;

    const edgesJSX = edges.map((e, i)=>{
      return i!==index?
        (
          <div>
            <EdgeConnectionItem
              profileImageUrl={e.user.twitter.profile_image_url}
              username={e.user.username}
              createdAt={e.createdAt}/>
          </div>
        ):null;
    })

    return (
      <div className="edge-connection connectionCard">
        <div
          title={username}
          style={connectBlocksStyle}>Connecter:
        </div>
        <div style={connectBlocksStyle}>
          <EdgeConnectionItem
            profileImageUrl={profile_image_url}
            username={username}
            createdAt={createdAt} />
          {length>1?
          <span>
            &nbsp;|&nbsp;
            <a href="javascript:void(0)" onClick={this._toggle} >see {length-1} more</a>
          </span>:null}
          {this.state.open?(edgesJSX):null}
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
