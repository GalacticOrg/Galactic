import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL/"
import InfoModal from "./InfoModal.react"
//import Connection from "../../components/Connection.react"
import EntityItem from "../../components/EntityItem.react"

const inputKey = 'homeResult';
const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
}

import { getFirehose } from "../actions/index"

class Home extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getFirehose())
  }

  render() {
    const { node, isURL, firehoseResult, dispatch } = this.props;

    const connections = firehoseResult?
    firehoseResult.map(function(edge, i){
      return <EntityItem
        key={i}
        edge={edge}
      />
    }):null;




    // let existingPage = null;
    // if (node && node.isConnected)
    //   existingPage = <div
    //   className={[
    //           'col-xs-8',
    //           'col-xs-offset-2',
    //           'col-sm-8',
    //           'col-sm-offset-2',
    //           'col-md-8',
    //           'col-md-offset-2',
    //         ]}
    //   style={{
    //     marginTop: '5px',
    //     fontStyle: 'italic'}}>
    //   </div>
    // else if (isURL) {
    //   const url = node.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"");
    //   existingPage = (
    //     <div className={[
    //           'col-xs-8',
    //           'col-xs-offset-2',
    //           'col-sm-8',
    //           'col-sm-offset-2',
    //           'col-md-8',
    //           'col-md-offset-2',
    //         ]} style={{marginTop: '5px', fontStyle: 'italic'}}>
    //     </div>
    //   );
    // }

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="text-center" style={{height: '65px', margin: '150px 0 50px'}}>
              <img src='/img/WikiWeb.png' />
            </div>
          </div>
          <div className='row'>
            <div
              className={
              ['col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'].join(' ')
              }>
              <InputURL
                placeholder="Paste URL to search"
                hasSearchButton={true}
                receivedSearchResult={this._onSearchResult}
                id={inputKey}/>
            </div>
          </div>
          <InfoModal />
          {connections}
        </div>
      </div>
    );
  }

  _changeMessage(i){
    this.setState({
      messageIndex: i
    })
  }
}

function mapStateToProps(state) {
  const { firehoseResult, inputURLResult} = state

  let object = { firehoseResult }

  if (  inputURLResult && inputURLResult[inputKey] ){
    const { node, isURL } = inputURLResult[inputKey];
    Object.assign(object, { node, isURL });
  }

  return object
}

export default connect(mapStateToProps)(Home)
