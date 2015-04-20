/********************************************************************
  START SCREEN
*********************************************************************/

var StartScreen = React.createClass({
  getInitialState: function() {
    return {
      showControls : true,
      style: {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      posterStyle: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundImage: "url('"+this.props.contentTree.promo_image+"')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        //visibility: hidden
      },
      posterFullsize: true,
      description: this.props.contentTree.description
    };
  },

  componentWillMount: function() {
    var posterImage = document.createElement("img");
    posterImage.onload = this.props._.bind(this.renderPoster, this, posterImage);
    posterImage.src = this.props.contentTree.promo_image;
  },

  componentDidMount: function() {
    var actualNode = this.getDOMNode();
    var testText = document.createElement("span");
    testText.style.visibility = "hidden";
    testText.style.position = "absolute";
    testText.style.whiteSpace = "nowrap";
    testText.style.fontSize = "24px";
    testText.innerHTML = this.state.description;
    actualNode.appendChild(testText);
    var actualWidth = actualNode.getElementsByClassName("startscreen-description")[0].clientWidth;
    var textWidth = testText.scrollWidth;

    if (textWidth > (actualWidth * 1.8)){
      var truncPercent = actualWidth / textWidth;
      var newWidth = (Math.floor(truncPercent * this.props.contentTree.description.length) * 1.8) - 3;
      var newDesc =
      this.setState({description: (this.state.description.slice(0,newWidth) + "...")});
    }
    testText.parentNode.removeChild(testText);
  },

  handleClick: function() {
    this.props.controller.play();
  },

  renderPoster: function(posterImage) {
    var elemWidth = this.getDOMNode().clientWidth;
    var elemHeight = this.getDOMNode().clientHeight;
    var infoBox = this.getDOMNode().getElementsByClassName("startscreen-info")[0];
    if (posterImage.height < elemHeight && posterImage.width < elemWidth) {
      var newPosterStyle = this.props._.clone(this.state);
      newPosterStyle.posterFullsize = false;
      newPosterStyle.posterStyle.backgroundSize = "auto";
      newPosterStyle.posterStyle.backgroundPosition = "left " +
        this.props.data.skin.startScreen.infoPanel.style.left +
        " bottom " + infoBox.clientHeight + "px";
      this.setState(newPosterStyle);
    }
  },

  render: function() {
    var skinSetting = this.props.data.skin;
    var playClass = skinSetting.playButton.icon;
    var playStyle = skinSetting.playButton.style;

    if (this.state.posterFullsize) {
      return (
        <div style={this.state.style}>
          <div style={this.state.posterStyle}></div>
          <span className={playClass} style={playStyle} aria-hidden="true" onClick={this.handleClick}></span>
          <div className="startscreen-info" style={skinSetting.startScreen.infoPanel.style}>
            <div style={skinSetting.startScreen.infoPanel.title.style}>{this.props.contentTree.title}</div>
            <div className="startscreen-description" style={skinSetting.startScreen.infoPanel.description.style}>{this.state.description}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={this.state.style}>
          <div className="startscreen-info" style={skinSetting.startScreen.infoPanel.style}>
            <img src={this.props.contentTree.promo_image}/>
            <div style={skinSetting.startScreen.infoPanel.title.style}>{this.props.contentTree.title}</div>
            <div className="startscreen-description" style={skinSetting.startScreen.infoPanel.description.style}>{this.state.description}</div>
          </div>
          <span className={playClass} style={playStyle} aria-hidden="true" onClick={this.handleClick}></span>
        </div>
      );
    }


  }
});

/********************************************************************
  PLAYING SCREEN
*********************************************************************/

var PlayingScreen = React.createClass({
  getInitialState: function() {
    return {showControls : true};
  },

  handleMouseMove: function() {
    this.setState({showControls : true});
  },

  handleMouseOut: function() {
    this.setState({showControls : false});
  },

  handleClick: function() {
    this.props.controller.pause();
  },

  render: function() {
    var style = {
      width : "100%",
      height : "100%",
      position : "absolute",
      zIndex : 20000,
      overflow: "hidden",
    };

    var skinSetting = this.props.data.skin;
    var playClass = skinSetting.pauseButton.icon;
    var playStyle = skinSetting.pauseButton.style;
    playStyle.opacity = this.state.showControls ? 1 : 0;

    return (
      <div style={style} onMouseMove={this.handleMouseMove} onMouseOut={this.handleMouseOut}>
        <span className={playClass} style={playStyle} aria-hidden="true" onClick={this.handleClick}></span>
      </div>
    );
  }
});

/********************************************************************
  PAUSE SCREEN
*********************************************************************/

var PauseScreen = React.createClass({
  getInitialState: function() {
    return {showControls : true};
  },

  handleMouseMove: function() {
    this.setState({showControls : true});
  },

  handleMouseOut: function() {
    this.setState({showControls : false});
  },

  handleClick: function() {
    this.props.controller.play();
  },

  render: function() {
    var style = {
      width : "100%",
      height : "100%",
      position : "absolute",
      zIndex : 20000,
      overflow: "hidden",
    };

    var skinSetting = this.props.data.skin;
    var playClass = skinSetting.playButton.icon;
    var playStyle = skinSetting.playButton.style;
    playStyle.opacity = this.state.showControls ? 1 : 0;

    return (
      <div style={style} onMouseMove={this.handleMouseMove} onMouseOut={this.handleMouseOut}>
        <span className={playClass} style={playStyle} aria-hidden="true" onClick={this.handleClick}></span>
      </div>
    );
  }
});

/********************************************************************
  END SCREEN
*********************************************************************/

var EndScreen = React.createClass({
  render: function() {
    return false;
  }
});

/********************************************************************
  ERROR SCREEN
*********************************************************************/

var ErrorScreen = React.createClass({
  render: function() {
    return false;
  }
});
