import React from 'react';
import mui, { RaisedButton, Dialog, Styles } from 'material-ui';

const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const ThemeManager = Styles.ThemeManager;
const Colors = Styles.Colors;

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        }
    }

    getChildContext() {
        return { muiTheme: this.state.muiTheme };
    }

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500
        });

        this.setState({muiTheme: newMuiTheme});
    }


    _handleTouchTap() {
        this.refs.superSecretPasswordDialog.show();
    }

    render() {
        let containerStyle = {
            textAlign: 'center',
            paddingTop: '200px',
        };

        let standardActions = [
            { text: 'Okay' },
        ];

        return (
            <div style={containerStyle}>
                <Dialog
                    title="Super Secret Password"
                    actions={standardActions}
                    ref="superSecretPasswordDialog">
                    1-2-3-4-5
                </Dialog>

                <h1>material-ui</h1>
                <h2>example project</h2>
                <RaisedButton label="Hello world"
                    primary={true}
                    onTouchTap={this._handleTouchTap.bind(this)}
                />

            </div>
        );
    }
}

Main.childContextTypes = {
    muiTheme: React.PropTypes.object
}

export default Main;
