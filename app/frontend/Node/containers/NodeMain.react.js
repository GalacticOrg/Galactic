import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/Entity/"
import EdgeConnection from "../../components/EdgeConnection"
import TagsInput from "../components/TagsInput.react"

import { Alert, Tooltip, OverlayTrigger  } from "react-bootstrap"
import { getNode, postNodeTags } from "../actions/index"

class NodeMain extends Component {

  constructor() {
     super()
     const messageFlag = window.location.search.search((/message=true/))
     this._handleAlertDismiss = this._handleAlertDismiss.bind(this)
     this.state = {
       messageFlag: messageFlag!=-1?true:false
     }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getNode(window.location.pathname.replace('/node/',''))) //@todo include this in the page
  }

  render() {
    const that = this;
    const { nodeResult, user } = this.props
    const { messageFlag } = this.state

    if (!nodeResult || Object.keys(nodeResult).length==0) {
      return (
      <div>
        <Navbar/>
        <Loader top={'30%'} />
      </div>)
    }

    const { superEdges, faviconCDN, title, entityCount, canonicalLink, description } = nodeResult

    const connectHref = "/connect?url="+canonicalLink

    const prettyLink = canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'');

    let documentImage = (<span><img src="/img/document.png" style={{height: '50px'}} /></span>)
    if (faviconCDN){
      documentImage = (<span><img src={faviconCDN} style={{width: '16px'}} /></span>)
    }

    const nodeEdges = superEdges.map(function(superEdge, i){

      const { users, entity, edges, entityCount } = superEdge;

      let tags = edges.map(edge=>edge.tags).reduce((a, b)=>a.concat(b));

      const userId = user?user.user._id:null;
      const currentUserEdgeId = that._getCurrentUserEdgeId(edges, userId); //Has the user created an edge to tag along this route?
      const tagsInputJSX = currentUserEdgeId ?
        <TagsInput
          tags={tags}
          id={currentUserEdgeId}
          />:null;
      return (
        <div
          key={i}
          className='default-card'
          >
          <EntityItem
            count={entityCount}
            imageCDN={entity.imageCDN.url?entity.imageCDN.url:''}
            faviconCDN={entity.faviconCDN?entity.faviconCDN:''}
            canonicalLink={entity.canonicalLink}
            title={entity.title}
            description={entity.description}
            id={entity._id}
          />
          <EdgeConnection
            edges={edges}
            index={0}
          />
          <div style={{display: 'block', overflow: 'hidden', border: 'none', marginTop: '3px'}}>
            <div className="card-left-col">
              <img src="../../img/blank.png" />
            </div>
            <div
              className="card-right-col"
              style={{ paddingLeft: '5px'}}>
              {tagsInputJSX}
            </div>
          </div>
        </div>)
    });

    const tooltip = (
      <Tooltip id="emptyNodeTooltip" className="wikiweb-tooltip">When you connect two URLs together, you are helping to grow the WikiWeb since other people can find those connections later.</Tooltip>
    );

    const emptyMessage = nodeEdges.length==0?
    <div>
      <h3>Shucks! There are no connections to this site <i>yet</i>.</h3>
      <p>
        You chould be the first to&nbsp;
        <b><a href={connectHref}>create one</a></b>.
          <OverlayTrigger placement="top" overlay={tooltip}>
            <sup>
            <span className="fa fa-info-circle" style={{color: '#337ab7'}}></span>
            </sup>
          </OverlayTrigger>
      </p>
    </div>
    :null;

    let descriptionClipped = ''
    if (description.length > 200){
      descriptionClipped = description.slice(0,200)+"..."
    } else {
      descriptionClipped = description
    }

    return (
      <div>
        <Navbar />
        <div  className="container"
              style={{
                marginTop:'40px',
                marginBottom: '40px',
                backgroundColor: 'white'}}>
          <div className='row'>
            <div className={
              ['col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'].join(' ')
              }>

            <div style={{display: 'block', overflow: 'hidden'}}>
              <div  className="card-left-col"
                    style={{paddingTop: '20px', textAlign: 'center'}}>
                {documentImage}
              </div>
              <div  className="card-right-col"
                    style={{paddingLeft: '5px', paddingRight: '5px'}}>
                <h3>{title}</h3>
                <div>
                  <span
                    className="label label-default">
                    {entityCount}
                  </span>
                  <a  href={canonicalLink}
                      className="noUnderline"
                      style={{marginLeft: '5px'}}>
                  <span>{prettyLink}</span>
                  </a>
                </div>
                <div style={{fontSize:'14px', paddingTop: '8px'}}>{descriptionClipped}</div>
                <a href={connectHref}>
                   <button
                     type="button"
                     className="btn btn-default invertibleButton"
                     style={{marginTop: '10px', border: '1px solid orange'}}>
                     Add a connection
                   </button>
                 </a>
              </div>
             </div>

            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgb(225, 232, 237)',
          backgroundColor: '#F5F8FA',
          paddingTop: '5px'}}>
          <div className="container" >
            <div className='row'>
              <div className={
                ['col-xs-12',
                'col-sm-10',
                'col-sm-offset-1',
                'col-md-8',
                'col-md-offset-2'].join(' ')
                }>
                {messageFlag && superEdges[0]?
                  <Alert bsStyle="success" onDismiss={this._handleAlertDismiss}>
                    <h4>You added a new Connection!</h4>
                    <p>Every connection on the WikiWeb makes it that much more useful for the next person.</p>
                    <br/>
                  </Alert>
                 :null}
                <div className={messageFlag?'highlight-first':''}>
                  {nodeEdges}
                </div>
                <div>
                  {emptyMessage}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  _addTag(input){
    this.props.dispatch( postNodeTags(id, this.state.tagInput.split(' ') ));
  }

  _handleAlertDismiss(){
    this.setState({
      messageFlag:false
    })
  }

  _getCurrentUserEdgeId(edges, userId){
    const currentUserEdge = edges.find(e=>e.user._id==userId);
    return currentUserEdge?currentUserEdge._id:null;
  }

}

function mapStateToProps(state) {
  const { nodeResult, edgeResult, userResult } = state;
  let user = null;
  if ( userResult && userResult.success ){
    user = userResult;
  }
  return {
    nodeResult,
    edgeResult,
    userResult,
    user
  }
}


export default connect(mapStateToProps)(NodeMain)
