import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import Navbar from '../../components/Navbar.react';
import InputURL from '../../components/InputURL/';
import EntityItem from '../../components/Entity/';
import EdgeConnection from '../../components/EdgeConnection/';
import Tags from '../../components/Tags.react';

const inputKey = 'homeResult';
const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
};

import { getFirehose } from '../actions/index';

class Home extends Component {

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch(getFirehose());
  }

  render () {
    const { node, isURL, firehoseResult, dispatch } = this.props;
    const connections = firehoseResult ? firehoseResult.map(function (edge, i){
      const { user, nodeFrom, nodeTo, createdAt, nodeFromEntityCount, nodeToEntityCount, tags } = edge;
      let tagsSection = (<Tags tags={tags}/>);

      if (tags.length < 1) {
        tagsSection = (null);
      }

      return (
        <div key={i} className="default-card" style={{ marginBottom: 10 }}>
          <div style={{ border: 'none', paddingTop: '10px' }}>
            <EntityItem
              count={nodeFromEntityCount}
              imageCDN={nodeFrom.imageCDN.url ? nodeFrom.imageCDN.url : ''}
              faviconCDN={nodeFrom.faviconCDN ? nodeFrom.faviconCDN : ''}
              canonicalLink={nodeFrom.canonicalLink}
              title={nodeFrom.title}
              description={nodeFrom.description}
              id={nodeFrom._id}
              createdAt={Number(createdAt)}
            />
          </div>
          <div style={{ border: 'none', paddingTop: '10px' }}>
            <EntityItem
              count={nodeToEntityCount}
              imageCDN={nodeTo.imageCDN.url ? nodeTo.imageCDN.url : ''}
              faviconCDN={nodeTo.faviconCDN ? nodeTo.faviconCDN : ''}
              canonicalLink={nodeTo.canonicalLink}
              title={nodeTo.title}
              description={nodeTo.description}
              id={nodeTo._id}
              createdAt={Number(createdAt)}
            />
          </div>
          <div style={{ height: 27 }}>
            <EdgeConnection edges={[edge]} index={0} />
            <span style={{ float: 'right' }}>{tagsSection}</span>
          </div>
        </div>);
    }) : <Loader top="100px"/>;

    return (
      <div style={{ backgroundColor:'white' }}>
        <Navbar />
        <div className="container" style={{ marginBottom:'80px' }}>
          <div className="row">
            <div className="text-center" style={{ margin: '100px 0 30px' }}>
              <div style={{ height: 90 }}>
                <span style={{ fontFamily: "'Ovo', serif", fontSize: '68px' }}>
                  <b>WikiWeb</b>
                </span>
              </div>
              <div style={{ fontFamily: "'Ovo', serif", fontSize: '18px', marginLeft: '15px' }}>
                <span className='tagline'>Crowdsourced suggestions for what to read next on the Internet.
                  <sup>
                    <a href="/about">
                      <span className="fa fa-info-circle" style={{ color: '#337ab7' }} />
                    </a>
                  </sup>
                </span>
              </div>
              <div className='downloadPluginBox' >
                <div className='logoBox'>
                  <a href="">
                    <img src='/img/logo.png' style={{ height: 50, width: 50 }} />
                  </a>
                </div>
                <div className="contentBox">
                  <span>
                    <a href="">Download</a> the chrome plugin to get started.
                  </span>
                  <span>
                    <a href="">
                      <img src='/img/outbound_link.png'/>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5F8FA', paddingTop: '10px', borderTop: '1px #E1E8ED solid' }}>

        </div>
         
      </div>
    );
  }

  _changeMessage (i){
    this.setState({
      messageIndex: i
    });
  }
}

function mapStateToProps (state) {
  const { firehoseResult, inputURLResult } = state;
  let object = { firehoseResult };
  if (  inputURLResult && inputURLResult[inputKey] ){
    const { node, isURL } = inputURLResult[inputKey];
    Object.assign(object, { node, isURL });
  }
  return object;
}

export default connect(mapStateToProps)(Home);
