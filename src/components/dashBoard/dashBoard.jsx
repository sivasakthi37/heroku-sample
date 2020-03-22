import React, { Component } from "react";
import { Select, Table, Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { deleteData } from "../../stateManager/actions/index";
import axios from "axios";
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
    dialogData: {}
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
    console.log("this", this.state);

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
                <Avatar
                  aria-owns={this.state.popover ? "simple-popper" : undefined}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  className={classes.bigAvatar}
                  style={{ cursor: "pointer" }}
                  onClick={event => {
                    this.setState({
                      popover: true,
                      anchorEl: event.currentTarget
                    });
                  }}
                />
                
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
            The content of the Popover.
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
  { deleteData }
)(ComponenentWithStyle);
