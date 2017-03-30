import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import Navbar from '../../components/Navbar.react';
import InputURL from '../../components/InputURL/';
import EntityItem from '../../components/Entity/';
import EdgeConnection from '../../components/EdgeConnection/';
import Tags from '../../components/Tags.react';
import Firehose from '../../Firehose/containers/FirehoseMain.react';

const inputKey = 'homeResult';
const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px',
};

import { getFirehose } from '../actions/index';

class Home extends Component {

  componentWillMount () {
    const { dispatch } = this.props;
    // dispatch(getFirehose());
  }

  render () {
    const { node, isURL, firehoseResult, dispatch } = this.props;
    const connections = firehoseResult ? firehoseResult.map(function (edge, i) {
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

    window.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    const isMobile = window.mobileAndTabletcheck() ? 'none' : 'inline';

    const contentBox = window.mobileAndTabletcheck() ? (
      <div className="contentBox">
        <strong><span style={{ width: '100%', textAlign: 'middle' }}>Sorry folks, the WikiWeb is desktop only.</span></strong>
      </div>) :
    (<div className="contentBox">
        <span>
          <a href="javascript:void();"  onClick={this.download} className="cursorPointer">Download</a> the chrome plugin to get started.
        </span>
        <span>
          <a href="javascript:void();"  onClick={this.download} >
            <img src='/img/outbound_link.png'/>
          </a>
        </span>
      </div>);

    return (
      <div className="homepageTopModule">
        <Navbar />
        <div className="container" style={{ marginBottom: 110 }}>
          <div className="row">
            <div className="text-center" style={{ margin: '100px 0 30px' }}>
              <div style={{ height: 90 }}>
                <span style={{ fontFamily: "'Ovo', serif", fontSize: '68px' }}>
                  <b style={{ color: 'rgb(112, 2, 123)' }}>WikiWeb</b>
                </span>
              </div>
              <div style={{ fontFamily: "'Ovo', serif", fontSize: '18px' }}>
                <span className='tagline'><em>Crowdsourced suggestions for what to read next on the Internet</em>.
                  <sup>
                    <a href="/about">
                      <span className="fa fa-info-circle" style={{ color: '#337ab7' }} />
                    </a>
                  </sup>
                </span>
              </div>

              <div className="downloadPluginBoxWrapper">
                <div className="downloadPluginBox" >
                  <div className='logoBox'>
                    <a href="">
                      <img src='/img/logo.png' style={{ height: 50, width: 50 }} />
                    </a>
                  </div>
                  {contentBox}
                </div>
              </div>

            </div>
          </div>
          <div className="subnavBar">
            <div className="navOptions">
              <span><a href="/about" className="cursorPointer">About</a></span>
              <span><a href="/faq" className="cursorPointer">FAQ</a></span>
              <span style={{ display: isMobile }}><a href="/download"  className="cursorPointer">Install</a></span>
            </div>
          </div>
        </div>

        <Firehose />

      </div>
    );
  }

  _changeMessage (i){
    this.setState({
      messageIndex: i
    });
  }
  download (e){
    chrome.webstore.install();
    e.preventDefault();
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
