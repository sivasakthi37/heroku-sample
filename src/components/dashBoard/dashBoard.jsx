import React from "react";
// import { Select, Table, Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { deleteData, addData } from "../../stateManager/actions/index";
// import axios from "axios";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import edit from "../../assets/create-24px.svg";
import Avatar from "@material-ui/core/Avatar";
import FormDialog from "./dialog";
import Popover from "@material-ui/core/Popover";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: true,
    selectProduct: "",
    openDialog: false,
    dialogData: {},
    addDataOpenDialog: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const { anchorEl } = this.state;
    console.log("this", this.props);

    let { imageUrl, email, name } = this.props.user.profileObj;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Product details
            </Typography>

            <div style={{ marginLeft: "86%" }}>
              <span>
                {imageUrl && (
                  <Avatar
                    aria-owns={this.state.popover ? "simple-popper" : undefined}
                    alt={name && name.charAt(0)}
                    src={imageUrl && imageUrl}
                    className={classes.bigAvatar}
                    style={{ cursor: "pointer" }}
                    onClick={event => {
                      this.setState({
                        popover: true,
                        anchorEl: event.currentTarget
                      });
                    }}
                  />
                )}
              </span>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <List>
            <ListItem button>
              <ListItemIcon>+</ListItemIcon>
              <ListItemText
                primary={"ADD PRODUCT"}
                onClick={() => {
                  this.setState({ addDataOpenDialog: true });
                }}
              />
            </ListItem>
            {["Product1", "Product2", "Product3"].map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => {
                    this.setState({ selectProduct: text });
                    console.log("clicked", text);
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <div style={{ display: "flex", flexWrap: "wrap", padding: "5px" }}>
            {this.state.selectProduct ? (
              this.props.dashboard[this.state.selectProduct] &&
              this.props.dashboard[this.state.selectProduct].map(data => {
                return (
                  <div
                    class="card"
                    style={{ width: "23%", padding: "12px", margin: "5px" }}
                  >
                    <div style={{ float: "right", cursor: "pointer" }}>
                      <img
                        onClick={() => {
                          this.setState({ openDialog: true, dialogData: data });
                        }}
                        src={edit}
                        alt=""
                      />
                      <DeleteForeverOutlinedIcon
                        onClick={() => {
                          this.props.deleteData(data);
                        }}
                        className={classes.icon}
                      />
                    </div>
                    <div class="container">
                      <h4>
                        <b>Name:{data.customer_name}</b>
                      </h4>
                      <p>
                        <b>Email:</b>
                        {data.customer_email}
                      </p>
                      <p>
                        <b>Quantity:</b>
                        {data.quantity}
                      </p>
                      <p>
                        <b>Product:</b>
                        {data.product}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>Please select the product from the left drawer</h1>
              </div>
            )}
            {this.state.openDialog && (
              <FormDialog
                opendialog={this.state.openDialog}
                data={this.state.dialogData}
                closedialog={() => {
                  this.setState({ openDialog: false });
                }}
              />
            )}

            <AddDataFormDialog
              opendialog={this.state.addDataOpenDialog}
              closedialog={() => {
                this.setState({ addDataOpenDialog: false });
              }}
              addData={this.props.addData}
            />
          </div>
        </main>
        <Popover
          id="simple-popper"
          open={this.state.popover}
          anchorEl={anchorEl}
          onClose={() => {
            this.setState({ popover: false });
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography className={classes.typography}>
            <div>
              <div>Email:{email && email}</div>
              <div>Name:{name && name}</div>
            </div>
            <Divider />
            <div onClick={() => {}}>Logout</div>
          </Typography>
        </Popover>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

let ComponenentWithStyle = withStyles(styles, { withTheme: true })(
  PersistentDrawerLeft
);
const mapStateToProps = state => {
  console.log(" in dash", state);
  return {
    dashboard: state.dashboard,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { deleteData, addData }
)(ComponenentWithStyle);

class AddDataFormDialog extends React.Component {
  state = {
    customer_name: "",
    customer_email: "",
    quantity: "",
    id: "",
    product: ""
  };

  save = () => {
    let data = {
      id: new Date().getUTCMilliseconds(),
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      product: this.state.product,
      quantity: this.state.quantity
    };
    this.props.addData(data);
    this.props.closedialog();
  };
  handleChange = data => {
    console.log("data", data);
    this.setState({ product: data.target.value });
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
          <DialogTitle id="form-dialog-title">Add data</DialogTitle>
          <DialogContent>
            <DialogContentText>{}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Customer Name"
              type="string"
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
              fullWidth
              onChange={e => {
                this.setState({ quantity: e.target.value });
              }}
            />
            <form autoComplete="off">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Product
                </InputLabel>
                <Select
                  style={{ width: "100%" }}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "Product",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value={"Product 1"}>Product 1</MenuItem>
                  <MenuItem value={"Product 2"}>Product 2</MenuItem>
                  <MenuItem value={"Product 3"}>Product 3</MenuItem>
                </Select>
              </FormControl>
            </form>
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
