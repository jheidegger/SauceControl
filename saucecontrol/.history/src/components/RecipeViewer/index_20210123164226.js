import React, { useState, useEffect, Component } from 'react';
class ExternalProfileBase extends Component {
    constructor(props) {
        super(props);
        this.state = {... initFields};
        this.followButton = <button onClick={this.followUser}>Follow</button>;
    }
}