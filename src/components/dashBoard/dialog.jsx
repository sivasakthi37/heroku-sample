import React from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { updateData } from "../../stateManager/actions/index";

class FormDialog extends React.Component {
  state = {
    customer_name: "",
    customer_email: "",
    quantity: "",
    id: "",
    product: ""
  };
  componentDidMount() {
    this.setState({
      product: this.props.data.product,
      customer_name: this.props.data.customer_name,
      customer_email: this.props.data.customer_email,
      quantity: this.props.data.quantity,
      id: this.props.data.id
    });
  }
  save = () => {
    let data = {
      id: this.props.data.id,
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      product: this.props.data.product,
      quantity: this.state.quantity
    };
    this.props.updateData(data);
    this.props.closedialog();
  };
  render() {
    console.log("this.dialog", this.props);

    return (
      <div>
        <Dialog
          open={this.props.opendialog}
          onClose={this.closedialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit data</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.data.product}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Customer Name"
              type="string"
              defaultValue={this.props.data.customer_name}
              fullWidth
              onChange={e => {
                console.log("eeeeeeee", e.target.value);

                this.setState({ customer_name: e.target.value }, () => {});
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Email"
              label="Customer Email"
              type="email"
              defaultValue={this.props.data.customer_email}
              fullWidth
              onChange={e => {
                this.setState({ customer_email: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Email"
              label="Quantity"
              type="string"
              defaultValue={this.props.data.quantity}
              fullWidth
              onChange={e => {
                this.setState({ quantity: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closedialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.save} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(" in dash", state);
  return {
    dashboard: state.dashboard,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { updateData }
)(FormDialog);
