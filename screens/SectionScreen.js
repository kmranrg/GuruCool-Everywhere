import React from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-showdown";

class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    // when you enter SectionScreen Component this will trigger
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    // when you're done with this SectionScreen Component this will trigger
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={{ uri: section.image.url }} />
            <Wrapper>
            <Logo source={{ uri: section.logo.url }} />
              <Subtitle>{section.subtitle}</Subtitle>
            </Wrapper>
            <Title>{section.title}</Title>
            <Caption>{section.caption}</Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {/* <WebView
            source={{ html: section.content + htmlStyles }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={(event) => {
              console.log(event);
              if (event.url != "about:blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is<strong> a <a href="https://github.com/kmranrg">link</a></p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Square_dissected_into_6_equal_area_triangles_no_border.svg/1200px-Square_dissected_into_6_equal_area_triangles_no_border.svg.png" />
`;

const htmlStyles = `
<style>
  * {
    font-family: -apple-system; 
    margin: 0;
    padding: 0;
    font-size: 17px; 
    font-weight: normal; 
    color: #3c4560;
    line-height: 24px;
  }

  h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #b8bece;
    font-weight: 600;
    margin-top: 50px;
  }

  p {
    margin-top: 20px;
  }

  a {
    color: #4775f2;
    font-weight: 600;
    text-decoration: none;
  }

  strong {
    font-weight: 700;
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
  }

  pre {
    padding: 20px;
    background: #212C4F;
    overflow: hidden;
    word-wrap: break-word;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  code {
    color: white;
  }

</style>
`;

const Content = styled.View`
  height: 900px;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
