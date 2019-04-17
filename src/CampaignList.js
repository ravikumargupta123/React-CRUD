import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default class CampaignList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, editItem: {} };
    this.handleClose = this.handleClose.bind(this);
    this.handleEditPop = this.handleEditPop.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleEdit(id) {
    this.setState({ open: true });
    this.handleEditPop(id);
  }
  handleCheckboxChange(id) {
    this.props.handleCheckboxChange(id);
  }
  handleDelete(id) {
    this.props.handleDelete(id);
  }
  deleteBulk() {
    this.props.deleteBulk();
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleEditPop(id) {
    let { data } = this.props;
    let editItem = data.find((ele, index) => ele._id == id);
    this.setState({ editItem });
  }
  handleEditChange(event) {
    let { editItem } = this.state;
    let newEditItem = { ...editItem };
    newEditItem[event.target.name] = event.target.value;
    this.setState({ editItem: newEditItem });
  }
  render() {
    let { data } = this.props;
    let { editItem } = this.state;
    return (
      <React.Fragment>
        <table>
          <tr>
            <td />
            <td>ID</td>
            <td>NAME</td>
            <td>ACTION</td>
          </tr>
          {data.map((ele, index) => (
            <tr key={ele._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={this.handleCheckboxChange.bind(this, ele._id)}
                />
              </td>
              <td>
                <span> {ele._id + ` `}</span>
              </td>
              <td>
                <span>{ele.name}</span>
              </td>
              <td>
                <span>
                  <a href="#" onClick={this.handleEdit.bind(this, ele._id)}>
                    edit
                  </a>
                </span>{" "}
                <span>
                  <a href="#" onClick={this.handleDelete.bind(this, ele._id)}>
                    delete
                  </a>
                </span>
              </td>
            </tr>
          ))}
        </table>
        <input
          type="button"
          value="Detete"
          onClick={this.deleteBulk.bind(this)}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <input
                type="text"
                name="name"
                value={editItem.name}
                onChange={this.handleEditChange}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmitEdit} color="primary">
              Edit
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
