import React from 'react'
import createTODO from "../App.js"



class TODOForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { text_to_do: '', create_or_update: "2024-01-01", project_name: 0, user: 0 }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createTODO(this.state.text_to_do, this.state.create_or_update, this.state.project_name, this.state.user)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group container">

                    <label for="text_to_do">Text</label>
                    <input type="text" className="form-control" name="text_to_do"
                        value={this.state.text_to_do} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group container">

                    <label for="date">Date</label>
                    <input type="date" className="form-control" name="create_or_update"
                        value={this.state.create_or_update} onChange={(event) => this.handleChange(event)} />
                </div>


                <div className="form-group container">

                    <label for="project_name">Project</label>
                    <select className="form-control" name="project_name"
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}> {item.project_name}</option>)}
                    </select>
                </div>

                <div className="form-group container">

                    <label for="user">User</label>
                    <select className="form-control" name="user"
                        onChange={(event) => this.handleChange(event)}> {this.props.user.map((item) => <option value={item.id}> {item.user_name}</option>)} </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form >
        );
    }
}
export default TODOForm