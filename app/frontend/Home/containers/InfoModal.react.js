import React, { Component } from 'react'
import { connect } from 'react-redux'

class InfoModal extends Component {

  constructor() {
     super();
     this.state = {
       node: null,
       messageIndex: 1,
       messages:[
         'Galactic is a crowdsourced map of the Internet.',
         'Use Galactic to search for related content online. Learn more.',
         'Help improve Galactic by connecting similar content or websites!',
         'Already a fan? Help Spread Galactic!',
         'Need Ideas? See what&#39;s similar to "DonaldTrump.com"'
      ]
    };
  }

  render() {
    const that = this;
    const { messageIndex } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>
            <ol style={{position:'inherit', display: 'block', margin: 'auto', textAlign: 'center'}} className="indicators">
              <div style={{
                display: 'block',
                margin: 'auto',
                textAlign: 'center',
                marginBottom: '3px',
                fontFamily: '"DDG_ProximaNova","DDG_ProximaNova_UI_0","DDG_ProximaNova_UI_1","DDG_ProximaNova_UI_2","DDG_ProximaNova_UI_3","DDG_ProximaNova_UI_4","DDG_ProximaNova_UI_5","DDG_ProximaNova_UI_6","Proxima Nova","Helvetica Neue","Helvetica","Segoe UI","Nimbus Sans L","Liberation Sans","Open Sans",FreeSans,Arial,sans-serif',
                fontWeight: 'lighter',
                fontSize: '1.25em',
                color: 'rgba(180,180,180,1)'
              }}>
              {this.state.messages[messageIndex]}
              </div>
              {this.state.messages.map((d, i)=>(
                <a href="javascript:void(0)" key={i} onClick={that._changeMessage.bind(that, i)}>
                  <li className={messageIndex==i?'active liElement':'liElement'} style={{marginLeft: '3px'}}></li>

                </a>
              )
            )}
            </ol>
          </div>
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
  const result = state.inputURLResult.result
  if (result){
    const { node, isURL } = result;
    return {
      node, isURL
    }
  }
  else{
    return {}
  }
}

export default connect(mapStateToProps)(InfoModal)
