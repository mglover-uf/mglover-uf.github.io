// Created by Alex Garcia, 2022-23
// ALEX Labs

var done = false;
var loader = document.getElementById("loading");
var spectrumModal = document.getElementById("spectrumWindow");

// Get config options for Plotly
var config = {
  modeBarButtonsToRemove:['pan2d','lasso2d','select2d','autoScale2d','toImage','zoom2d','resetScale2d','zoomIn2d','zoomOut2d'],
  responsive:true,
  displaylogo:false
};

// Get layout options for Plotly
var layout= {
  plot_bgcolor:"black",
  paper_bgcolor:"black",
  yaxis: {
    autorange: true,
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  xaxis: {
    tickcolor: "white",
    tickfont: {color:"white"},
    fixedrange: true,
    title: {
      text: 'Wavelength (Angstrom)',
      font: {
        color:'#FFFFFF',
        size: 20
      }
    }
  },
  yaxis: {
    fixedrange:true,
    title: {
      text: 'Flux',
      font: {
        color:'#FFFFFF',
        size: 16
      }
    }
  },
  showlegend:false
};

function updateDisplay() {
  /* Update the display after the spectrum has been generated

  */
  docStyle.setProperty("--seconds", String(noise)+"s");
  if (done) {
    done = false;
    loader.classList.remove('loading');
  }
}

function buttonPress() {
  /* Start taking the spectrum of the galaxy

  */
  takingSpectrum = true;

  updateClickFromCenter();

  spectrumModal.style.display = "block";

  document.getElementById('myPlot').style.display = 'none';
  loader.classList.add("loading");
  document.getElementById("SpectrumDone").innerHTML = "";
  
  Plotly.newPlot("myPlot", [], layout, config)
  
  loader.onclick = updateDisplay();
  loader.addEventListener("animationend", function() {
    /* Once "generating spectrum..." animation is over, actually generate the spectrum

    Yes, it is all smoke and mirrors, I make the user wait for nothing... muhahahah
    */
    if (CLICK_FROM_CENTER != 0.0){document.getElementById('magInfo').style.display = 'block';}
    document.getElementById('myPlot').style.display = 'block';
    generateSpectrum();
    done = true;
    updateDisplay();
  });
}

function generateSpectrum() {
  /* Create the absorption spectrum

  */
  for (var i = 3900; i < 4901; ++i) {
    lambdaArr[i-3000] = i;
    fluxArr[i-3000] = i/4900 - generateGaussian(1/5,1/7)/Math.sqrt(noise*9);
  }

  for (var i = 0; i < 3000*Math.sqrt(noise); ++i) {
    var index = lambdaArr.indexOf(Math.round(generateGaussian(CALCIUM_H_REDSHIFTED,4)));  
    fluxArr[index] = fluxArr[index] - 0.0001*CLICK_FROM_CENTER;

    var index = lambdaArr.indexOf(Math.round(generateGaussian(CALCIUM_K_REDSHIFTED,4)));  
    fluxArr[index] = fluxArr[index] - 0.0001*CLICK_FROM_CENTER;
  }

  trace1 = {x:lambdaArr,y:fluxArr,marker:{color:'rgb(219, 64, 82)'}}; // Color emperically determined
  data = [trace1];
  Plotly.newPlot("myPlot", data, layout, config);

  // If the integration time is 1 second it won't read "1 seconds"
  if (noise == 1) {
    var seconds = "second";
  } else {
    var seconds = "seconds";
  }

  document.getElementById("SpectrumDone").innerHTML = "Spectrum Complete (below), integration time: " + String(noise) + " " + String(seconds);
}
