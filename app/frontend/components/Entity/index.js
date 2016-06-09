import React, { Component, PropTypes } from 'react'
import EntityItemTitleHost from './EntityItemTitleHost.react'

const nodeEntityDescriptionStyle = {fontSize: '13px'}

export default class EntityItem extends Component {
  constructor(props) {
    super(props);
    this.state = { imgError: false };
  }

  render() {
    const { count, imageCDN, faviconCDN, canonicalLink, title, description, id } = this.props;
    const {imgError} = this.state;

    let edgeImg = null;
    if (imgError){
      edgeImg = '/img/document.png'
    } else if (imageCDN){
      edgeImg = imageCDN;
    } else if (faviconCDN){
      edgeImg = faviconCDN;
    } else {
      edgeImg = '/img/document.png'
    }


    let edgeDescription = ''
    if (description.length == 0){
      edgeDescription = <i className="text-muted">None</i>
    } else if (description.length > 200){
      edgeDescription = description.slice(0,200)+"..."
    } else {
      edgeDescription = description
    }

    return (
      <div>
        <div style={{display: 'block', overflow: 'hidden'}}>
          <div className="card-left-col">
             <div style={{
                overflow:'hidden',
                paddingLeft: '8px',
                paddingTop: '6px'
              }}>
              <img
                onError={this._handleImageErrored.bind(this)}
                src={edgeImg}
                style={{width: '50px'}} />
            </div>
          </div>
          <div
            className="card-right-col"
            style={{paddingLeft: '5px'}}>
            <div>
              <div style={{paddingBottom:'3px'}}>
                <EntityItemTitleHost
                  title={title}
                  id={id}
                  count={count}
                  canonicalLink={canonicalLink} />
                <span style={nodeEntityDescriptionStyle}>{edgeDescription}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleImageErrored(){
    this.setState({
      imgError:true
    })
  }
}

EntityItem.propTypes = {
  imageCDN: PropTypes.string.isRequired,
  faviconCDN: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
