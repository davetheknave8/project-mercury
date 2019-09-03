import React, { Component } from 'react';
import { connect } from 'react-redux';

class PcnView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_NOTES' });
    }

    handleChange(value) {
        this.setState({ text: value })
        console.log(this.state);
    }

    handleSubmit() {
        this.props.dispatch({ type: 'ADD_NOTE', payload: this.state })
    }


    render() {
        return (

            <>
                <h1>PCN View</h1>
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

                {/* this.props.match.params.id */}
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(PcnView);
