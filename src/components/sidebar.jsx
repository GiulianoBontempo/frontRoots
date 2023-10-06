import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { adjacencyMatrix, nodeNames} from './graphs'; // Importa dados de grafos
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Modal } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';



// Estiliza o Drawer
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "200px",
  "& .MuiDrawer-paper": {
    width: "18em",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    justifyContent: "center",
    height: "100%",
    alignSelf: "center",
  },
}));

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '5px solid green',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  color:"black",
  padding:"0px",
};


// Estilos para os botões
const centeredButtonStyles = {
  display: "flex",
  justifyContent: "center",
};

const smallButtonStyles = {
  padding: "10px 20px",
};

const imageStyles = {
  margin: "2em 0em",
};

// Função de algoritmo de Dijkstra
function dijkstra(adjacencyMatrix, startIndex, endIndex) {
  const numNodes = adjacencyMatrix.length;
  const visited = Array(numNodes).fill(false);
  const distances = Array(numNodes).fill(Number.MAX_VALUE);
  distances[startIndex] = 0;
  const parent = Array(numNodes).fill(null);

  for (let i = 0; i < numNodes - 1; i++) {
      const u = minDistance(distances, visited);
      visited[u] = true;

      for (let v = 0; v < numNodes; v++) {
          if (!visited[v] && adjacencyMatrix[u][v] !== 0 && distances[u] !== Number.MAX_VALUE && distances[u] + adjacencyMatrix[u][v] < distances[v]) {
              distances[v] = distances[u] + adjacencyMatrix[u][v];
              parent[v] = u;
          }
      }
  }
  const path = reconstructPath(parent, startIndex, endIndex);
  return { distance: distances[endIndex], path };
}

// Função auxiliar para encontrar a distância mínima
function minDistance(distances, visited) {
  let min = Number.MAX_VALUE;
  let minIndex = -1;

  for (let v = 0; v < distances.length; v++) {
      if (!visited[v] && distances[v] <= min) {
          min = distances[v];
          minIndex = v;
      }
  }
  return minIndex;
}

// Função auxiliar para reconstruir o caminho
function reconstructPath(parent, start, end) {
  const path = [end];
  let current = end;
  var i = 0
  while (current !== start && i < 5000) {
      current = parent[current];
      path.unshift(current);
      i++
  }
  return path;
}

var nodesPath = []; // Variável global para armazenar o caminho dos nós
var pathStr = "" ;
var passos = "";
var dist = 0;

const Sidebar = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [shortestPath, setShortestPath] = useState([]);
  const [edgesCsvData, setEdgesCsvData] = useState(null); // Dados CSV para arestas
  const [nodesCsvData, setNodesCsvData] = useState(null); // Dados CSV para nós
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = React.useState(false); //Controlodor do modal do manual de usuário
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false); //Controlodor do modal do manual de usuário
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [pathList, setPathList] = useState([]); //Novo estado para armazenar as diversas pathStr


  // Manipuladores de importação de CSV para arestas e nós
  const handleUploadEdges = async () => {
    if (edgesCsvData) {
      try {
        // Cria um objeto FormData para enviar o arquivo CSV
        const formData = new FormData();
        formData.append('file', edgesCsvData);
        // Envia uma solicitação POST para o servidor com o arquivo CSV
        const response = await fetch('https://back-roots.onrender.com/api/v1/csv/createEdges', {
          method: 'POST',
          body: formData,
        });
        // Verifica se a resposta da rede está OK
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Aguarda a resposta do servidor e recarrega a página após o upload
        const data = await response.json().then(window.location.reload());
        console.log(data);
      } catch (error) {
        console.error('Error uploading CSV:', error);
      }
    }
  };

  const handleUploadNodes = async () => {
    if (nodesCsvData) {
      try {
        // Cria um objeto FormData para enviar o arquivo CSV
        const formData = new FormData();
        formData.append('file', nodesCsvData);
        // Envia uma solicitação POST para o servidor com o arquivo CSV
        const response = await fetch('https://back-roots.onrender.com/api/v1/csv/createNodes', {
          method: 'POST',
          body: formData,
        });
        // Verifica se a resposta da rede está OK
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Aguarda a resposta do servidor e recarrega a página após o upload
        const data = await response.json().then(window.location.reload());
        console.log(data);
      } catch (error) {
        console.error('Error uploading CSV:', error);
      }
    }
  };

  // Executa a função handleUploadEdges quando edgesCsvData é atualizado
  useEffect(() => { handleUploadEdges() }, [edgesCsvData])
  // Executa a função handleUploadNodes quando nodesCsvData é atualizado
  useEffect(() => { handleUploadNodes() }, [nodesCsvData])

// Manipuladores de importação de CSV para arestas e nós
  const handleImportEdgesCSV = (event) => {
    const file = event.target.files[0];
    setCounter(counter + 1);
    setEdgesCsvData(file)
  };

  const handleImportNodesCSV = (event) => {
    const file = event.target.files[0];
    setCounter(counter + 1);
    setNodesCsvData(file)
  };


  // Manipulador de exportação para Excel
  const handleExportExcel = () => {
    const filteredNodeNames = nodeNames.filter((name => (name.startsWith("Valve") || name.startsWith("Hub"))));
    const namesWithout = []
    var namesChange = []
    filteredNodeNames.forEach(nodename => {
      if((nodename.includes("Valve") || nodename.includes("Hub")) && nodename.includes("_ON")){
        namesChange.push(nodename.slice(0,-3));
      } else if((nodename.includes("Valve") || nodename.includes("Hub")) &&  nodename.includes("_OFF")){
        namesChange.push(nodename.slice(0,-4));
      } else {
        namesWithout.push(nodename);
      }
    })
    const a = [...new Set(namesChange)];
  
    
    const workbook = XLSX.utils.book_new();
  
    
    const headers = ["Caminhos"]; 
    headers.push(...namesWithout.concat(a)); 
  
    const worksheetData = [["Caminhos", ...namesWithout.concat(a)]];
     pathList.forEach(path => {
      const valveRow = [];
      for (const valveName of namesWithout) {
        if (path.includes(valveName)) {
          valveRow.push("O");
        } else {
          valveRow.push(" ");
        }
      }
      const valChange = [];
      for (const name of a) {
        if (path.includes(name.concat("_ON"))) {
          valChange.push("O");
        } else if (path.includes(name.concat("_OFF"))) {
          valChange.push("X");
        } else {
          valChange.push(" ");
        }
      }

      worksheetData.push([path, ...valveRow.concat(valChange)]);
    });
  
   
  
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Write the workbook to a file
    XLSX.writeFile(workbook, 'example.xlsx');
  
    console.log("Excel sheet created successfully!");
  };
  
  
  

  // Manipulador para calcular o caminho mais curto
  const handleCalculateClick = () => {
    handleOpen1();
    const startIndex = nodeNames.indexOf(fromValue);
    const endIndex = nodeNames.indexOf(toValue);
    var result = dijkstra(adjacencyMatrix, startIndex, endIndex);
    nodesPath = result.path.map(index => nodeNames[index]);
    dist = result.distance;
    console.log('Shortest path:', result.path.map(index => nodeNames[index]));
    if(!nodesPath.includes(undefined)){
      for(var i = 0; i < nodesPath.length; i++){
        if(i!= nodesPath.length -1){
          passos += nodesPath[i] + " -> "
        } else {
          passos += nodesPath[i]
        }
      }
    } else {
      passos = "Caminho impossível"
    }
    pathStr = passos
    // Add pathStr to the list
    setPathList(prevList => [...prevList, pathStr]);
    passos = ""; // Reset passos para o próximo cálculo
    handleOpen1();

  };

  return (
    <StyledDrawer variant="permanent" anchor="right">
      <Button onClick={handleOpen}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6" style={{right:"0px",position:"relative"}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg> 
        </SvgIcon>
      </Button>
      <Modal open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={styleBox}>
            <div style={{padding:"15px"}}>Manual do usuário:<a style={{color:"white"}} >_________________________</a>              
            <Button onClick={handleClose}>
              <div style={{borderRight:"20px"}}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </SvgIcon>
              </div>
            </Button>
            </div>
            <div>
              <Card sx={{ maxWidth: 720, display:"flex", justifyContent: "center"}}>
              <iframe width="360" height="203"
              src="https://www.youtube.com/embed/V9aAqlzQVSI?autoplay=1">
              </iframe>
              </Card>
            </div>
          </Box>
        </Modal>
        <Modal open={open1} 
        onClose={handleClose1} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={styleBox}>
            <div style={{padding:"15px"}}>Caminho:<a style={{color:"white"}} >____________________________________</a>              
            <Button onClick={handleClose1}>
              <div style={{borderRight:"20px"}}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </SvgIcon>
              </div>
            </Button>
            De: {fromValue}<br></br>Para: {toValue}<br></br>Distância: {dist}<br></br>{pathStr}
            </div>
          </Box>
        </Modal>
      <img
        src='src/assets/grasshopper.svg'
        className="grasshopperLogo"
        alt="Grasshopper Logo"
        style={imageStyles}
      />
      <List>
        <ListItem>
          <TextField
            label="Start node name"
            variant="outlined"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="End node name"
            variant="outlined"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
          />
        </ListItem>
        <ListItem style={{ ...centeredButtonStyles, ...smallButtonStyles }}>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={handleCalculateClick}
          >
            Calculate
          </Button>
        </ListItem>
        <ListItem style={{ display: "flex", alignItems: "center", ...smallButtonStyles }}>
          <label htmlFor="edges-csv-upload">
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Edges
            </Button>
          </label>
          <input
            type="file"
            id="edges-csv-upload"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleImportEdgesCSV}
          />
          <label htmlFor="nodes-csv-upload">
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white", marginLeft: "5px" }}
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Nodes
            </Button>
          </label>
          <input
            type="file"
            id="nodes-csv-upload"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleImportNodesCSV}
          />
        </ListItem>
        <ListItem style={{ ...centeredButtonStyles, ...smallButtonStyles }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
            startIcon={<CloudDownloadIcon />}
            onClick={handleExportExcel}
          >
            Export
          </Button>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

export default Sidebar;
export { nodesPath }; // Exporta a variável nodesPath