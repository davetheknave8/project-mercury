import React, { Component } from 'react';
import { connect } from 'react-redux';

class PcnView extends Component {

    componentDidMount() {
        let data = {
            id: this.props.match.params.id,
            type: this.props.match.params.type
        };
        this.props.dispatch({ type: 'FETCH_PCN_INFO', payload: data });
        this.props.dispatch({ type: 'FETCH_PCN_PARTS', payload: data.id});
    }

    render() {
        return (

            <>
            <div className="pcnhead">
                <h2>Company Name Here</h2> 
                <h2>Product Change Notification</h2>
                <h2>{this.props.reduxStore.pcnInfo.id}</h2>
            </div>
            <div className="pcnaudience">
                <h3>Audience</h3>
                <p>{this.props.reduxStore.pcnInfo.audience}</p>
            </div>
            <div className="pcndate">
                <p>{this.props.reduxStore.pcnInfo.date}</p>
            </div>
            <div className="pcnbody">
                <h3>Description of Change</h3>
                <div className = "richbody" dangerouslySetInnerHTML={{
                    __html:
                    this.props.reduxStore.pcnInfo.change_description
                }}>

                </div>
            </div>
                {/* <div>
                    <h2>React Quill - Rich Text</h2>
                    <br />
                    <h4>Add a note</h4>
                    <ReactQuill className="what" theme="snow" value={this.state.text}
                        onChange={this.handleChange} />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                </div>
                <div className='notesDiv'>
                    {this.props.reduxStore.notes.map((note, i) => {
                        return (<div className="note" key={i} dangerouslySetInnerHTML={{
                            __html:
                                note.text
                        }}></div>);
                    })}
                </div> */}
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(PcnView);
