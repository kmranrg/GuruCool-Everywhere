import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
  };
}

class Avatar extends React.Component {
  state = {
    photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
  };

  componentDidMount() {
    fetch("https://picsum.photos/v2/list")
      /*
        API Documentation:

        1) Here's the format of the JSON data:
        [
          {
              "id": "0",
              "author": "Alejandro Escamilla",
              "width": 5616,
              "height": 3744,
              "url": "https://unsplash.com/...",
              "download_url": "https://picsum.photos/..."
          }
        ]

        2) The API returns 30 items per page by default.
      */

      /*
        If you have API Key, then do something like this:

        fetch("https://picsum.photos/v2/list",{
          headers: new Headers({
            "API_Field_Name": "API-Key"
          })
        })
      */
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({
          photo:
            response[Math.floor(Math.random() * response.length)][
              "download_url"
            ],
        });

        this.props.updateName(
          response[Math.floor(Math.random() * response.length)]["author"]
        );
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
