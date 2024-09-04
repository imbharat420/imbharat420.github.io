let fileCount = 0;
let selectedFileArea = null;

// Function to create a new file area
function createFileArea(fileId, parentElement, direction) {
    const fileArea = document.createElement('div');
    fileArea.className = 'pane';
    fileArea.id = fileId;
    fileArea.textContent = `Content of ${fileId}`;

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeFile(fileId);
    });
    fileArea.appendChild(closeButton);

    parentElement.appendChild(fileArea);

    fileArea.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e.pageX, e.pageY, fileId);
    });

    return fileArea;
}

// Function to switch to a file based on its ID
// Update the switchToFile function to handle layout changes
function switchToFile(fileId) {
    const fileTabs = document.querySelectorAll('#file-tabs .tab');
    const panes = document.querySelectorAll('.pane');

    // Deactivate all tabs and hide all panes
    fileTabs.forEach(tab => tab.classList.remove('active'));
    panes.forEach(pane => {
        pane.style.display = 'block';
        pane.style.gridArea = ''; // Reset grid area
    });

    // Activate the selected tab and display the selected pane
    const activeTab = document.querySelector(`#file-tabs .tab[data-file-id="${fileId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    const selectedPane = document.getElementById(fileId);
    if (selectedPane) {
        selectedPane.style.display = 'flex';
        selectedPane.style.gridArea = '1 / 1 / 2 / 2'; // Default to occupy the full area
    }

    selectedFileArea = fileId;

    // Adjust layout if needed
    adjustLayout();
}

// Adjust the layout to ensure proper grid arrangement
function adjustLayout() {
    const containers = document.querySelectorAll('.split-container');
    
    containers.forEach(container => {
        const panes = Array.from(container.querySelectorAll('.pane'));
        if (panes.length === 1) {
            // If only one pane remains, replace the container with that pane
            const onlyPane = panes[0];
            container.replaceWith(onlyPane);
        } else if (panes.length > 1) {
            // Set grid layout for containers with more than one pane
            const direction = container.classList.contains('down') ? 'down' :
                              container.classList.contains('up') ? 'up' :
                              container.classList.contains('left') ? 'left' : 'right';

            if (direction === 'down' || direction === 'up') {
                container.style.gridTemplateRows = '1fr 1fr';
                container.style.gridTemplateColumns = '1fr';
            } else if (direction === 'left' || direction === 'right') {
                container.style.gridTemplateRows = '1fr';
                container.style.gridTemplateColumns = '1fr 1fr';
            }

            panes.forEach((pane, index) => {
                if (direction === 'down') {
                    pane.style.gridRow = index + 1;
                    pane.style.gridColumn = '1';
                } else if (direction === 'up') {
                    pane.style.gridRow = (panes.length - index);
                    pane.style.gridColumn = '1';
                } else if (direction === 'left') {
                    pane.style.gridColumn = index + 1;
                    pane.style.gridRow = '1';
                } else if (direction === 'right') {
                    pane.style.gridColumn = (panes.length - index);
                    pane.style.gridRow = '1';
                }
            });
        }
    });
}
// Function to show context menu on right-click
function showContextMenu(x, y, fileId) {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.classList.remove('hidden');
    contextMenu.dataset.fileId = fileId;
}
 
function hideContextMenu() {
    document.getElementById('context-menu').classList.add('hidden');
}

function addTab(fileId) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.fileId = fileId;
    tab.textContent = fileId;

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeFile(fileId);
    });
    tab.appendChild(closeButton);

    tab.addEventListener('click', () => switchToFile(fileId));
    document.getElementById('tab-header').appendChild(tab);
}

// Function to split a file area into new panes
function splitFileArea(direction) {
    const fileId = document.getElementById('context-menu').dataset.fileId;
    const fileArea = document.getElementById(fileId);
    
    if (!fileArea) return;

    const newFileId = `file-${++fileCount}`;
    const newPane = createFileArea(newFileId, fileArea.parentElement);

    const container = document.createElement('div');
    container.className = `split-container ${direction}`;
    container.style.display = 'grid';

    if (direction === 'down' || direction === 'up') {
        container.style.gridTemplateRows = '1fr 1fr';
        container.style.gridTemplateColumns = '1fr';
    } else if (direction === 'left' || direction === 'right') {
        container.style.gridTemplateRows = '1fr';
        container.style.gridTemplateColumns = '1fr 1fr';
    }

    const parent = fileArea.parentElement;
    parent.appendChild(container);

    container.appendChild(fileArea);
    container.appendChild(newPane);

    if (direction === 'down') {
        fileArea.style.gridRow = '1';
        newPane.style.gridRow = '2';
        fileArea.style.gridColumn = '1';
        newPane.style.gridColumn = '1';
    } else if (direction === 'up') {
        fileArea.style.gridRow = '2';
        newPane.style.gridRow = '1';
        fileArea.style.gridColumn = '1';
        newPane.style.gridColumn = '1';
    } else if (direction === 'left') {
        fileArea.style.gridColumn = '2';
        newPane.style.gridColumn = '1';
        fileArea.style.gridRow = '1';
        newPane.style.gridRow = '1';
    } else if (direction === 'right') {
        fileArea.style.gridColumn = '1';
        newPane.style.gridColumn = '2';
        fileArea.style.gridRow = '1';
        newPane.style.gridRow = '1';
    }

    addTab(newFileId);
    hideContextMenu(); 
}

// Function to add a new file area and tab
function addFileArea() {
    const fileId = `file-${++fileCount}`;
    const newPane = createFileArea(fileId, document.getElementById('file-container'));
    addTab(fileId);
    switchToFile(fileId);
}

// Function to close a file tab and adjust the layout

function closeFile(fileId) {
    const fileArea = document.getElementById(fileId);
    const tab = document.querySelector(`#file-tabs .tab[data-file-id="${fileId}"]`);

    if (fileArea) {
        const parent = fileArea.parentElement;
        fileArea.remove();

        if (parent.classList.contains('split-container') && parent.children.length === 1) {
            const remainingPane = parent.firstElementChild;
            parent.replaceWith(remainingPane);
            remainingPane.style.display = 'flex';
            adjustLayout();
        }
    }

    if (tab) {
        tab.remove();
    }

    const tabs = document.querySelectorAll('#file-tabs .tab');
    if (tabs.length > 0) {
        const newFileId = tabs[0].dataset.fileId;
        switchToFile(newFileId);
    }
     hideContextMenu(); 
}

document.getElementById('add-file').addEventListener('click', addFileArea);
document.getElementById('add-tab').addEventListener('click', addFileArea);

document.querySelectorAll('#context-menu li').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.id.split('-')[1];
        if (action === 'close') {
            closeFile(document.getElementById('context-menu').dataset.fileId);
        } else {
            splitFileArea(action);
        }
    });
});
  
document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) {
        hideContextMenu();
    }
});
  
addFileArea();
