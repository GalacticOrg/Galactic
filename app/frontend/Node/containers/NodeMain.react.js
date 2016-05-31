import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/EntityItem.react"
import { Alert, Tooltip, OverlayTrigger  } from "react-bootstrap"

import { getNode } from "../actions/index"
const responsiveClasses = [
        'col-xs-12','col-sm-10',
        'col-sm-offset-1',
        'col-md-10',
        'col-md-offset-1'].join(' ')

class NodeMain extends Component {

  constructor() {
     super();
     this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
     const messageFlag = window.location.search.search((/message=true/))
     this.state = {
       messageFlag: messageFlag!=-1?true:false
     }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getNode(window.location.pathname.replace('/node/',''))) //@todo include this in the page

  }
  render() {
    const { nodeResult } = this.props
    const { messageFlag } = this.state

    if (!nodeResult || Object.keys(nodeResult).length==0) {
      return (
      <div>
        <Navbar/>
        <Loader top={'30%'} />
      </div>)
    }

    const { edges, faviconCDN, title, canonicalLink, description } = nodeResult

    const connectHref = "/connect?url="+canonicalLink

    const prettyLink = canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'');

    let documentImage = (<span><img src="/img/document.jpg" style={{height: '30px'}} /></span>)
    if (faviconCDN){
      documentImage = (<span><img src={faviconCDN} style={{width: '16px'}} /></span>)
    }

    const nodeEdges = edges.map(function(edge, i){
      return <EntityItem
          key={i}
          entity={edge.entity}
          user={edge.user}
        />
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

    return (
    <div>
      <Navbar />
      <div className={responsiveClasses+' row resultNodeCard'}>
        <div className="show-grid">
          <div className="resultFont">
            <br />
            <h3>{title}</h3>
            {documentImage}
            &nbsp;<a href={canonicalLink} className="noUnderline">
            <span className="resultNodeHyperlinkText">{prettyLink}</span>
            </a>
          </div>
        </div>
        <div>
          <div
            style={{fontSize: '17px', fontWeight: 'bold', marginTop: '5px'}}>
              <a href={connectHref}>
                 <button
                   type="button"
                   className="btn btn-default resultNodeAddConnectionBox">
                   Add a connection
                 </button>
               </a>
            </div>
          </div>
          <hr />
      </div>

      <div className={responsiveClasses + ' row resultsSection'}>
        {messageFlag?
          <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
            <h4>You added a new Connection!</h4>
            <p>Every connection on the WikiWeb makes it that much more useful for the next person. "From little things, big things grow."</p>
          </Alert>
         :null}
        <div className={messageFlag?'highlight-first':''}>
          {nodeEdges}
        </div>
        <div style={{margin:'50px'}}>
          {emptyMessage}
        </div>
      </div>
    </div>
  );
  }

  handleAlertDismiss(){
    this.setState({
      messageFlag:false
    })
  }

}

function mapStateToProps(state) {
  const { nodeResult } = state;
  return {
    nodeResult
  }
}

export default connect(mapStateToProps)(NodeMain)
