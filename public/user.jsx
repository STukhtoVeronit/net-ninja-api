const Users = React.createClass({
    getInitialState: function(){
        return ({
            users: []
        })
    },
    render: function() {

        let users = this.state.users;

        users = users.map(function(user, index) {
            return(
                <li key={index}>
                    <span className="user.obj.available"></span>
                    <span className="name"> {user.name}</span>
                    <span className="rank"> {user.rank}</span>
                    <span className="dist"> {user.dis} km</span>
                </li>
            )
        });

        return(
            <div id="ninja-container">
                <form id="search" onSubmit={this.handleSubmit}>
                    <label>Enter your latitude</label>
                    <input type="text" ref="lat" placeholder="latitude" required/>
                    <label>Enter your longitude</label>
                    <input type="text" ref="lng" placeholder="longitude" required/>
                    <input type="submit" value="Find Users"/>
                </form>
                <ul>{users}</ul>
            </div>
        )

    },

    handleSubmit: function(e) {
        e.preventDefault();
        let lng = this.refs.lng.value;
        let lat = this.refs.lat.value;
        fetch(`/api/users?lng=${lng}&lat=${lat}`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    users:json
                })
            });
    }
});

ReactDOM.render(<Users />, document.getElementById('users'));