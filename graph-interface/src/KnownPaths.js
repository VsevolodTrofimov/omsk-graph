import React from 'react'
import paths from './paths.json';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentKnownPaths: Object.entries(paths) }
    }
}