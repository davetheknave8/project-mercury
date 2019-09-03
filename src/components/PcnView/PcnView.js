import React, { Component } from 'react';
import { connect } from 'react-redux';

class PcnView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PCN_INFO', payload: this.props.match.params.id });
    }

    render() {
        return (

            <>
                <h1>PCN View</h1>
                <h4>{this.props.match.params.id}</h4>
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
