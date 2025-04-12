import React, { useState, useMemo } from 'react';

function App() {
  const [m3uContent, setM3uContent] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [filteredUrls, setFilteredUrls] = useState([]);

  const parseM3U = (text) => {
    const lines = text.split(/\r?\n/);
    const groups = {};
    let currentGroup = null;

    for (const line of lines) {
      if (line.startsWith('#EXTINF:')) {
        const groupTitleMatch = line.match(/group-title="([^"]*)"/);
        const nameMatch = line.match(/tvg-name="([^"]*)"/);
        const titleMatch = line.match(/,(.*)/);
        if (groupTitleMatch) {
          currentGroup = groupTitleMatch[1];
          const groupTitle = currentGroup;
          if (groupTitle.startsWith('VOD') && (groupTitle.includes('FRENCH') || groupTitle.endsWith('[FR]'))) {
            if (!groups[currentGroup]) {
              groups[currentGroup] = [];
            }
          } else {
            currentGroup = null; // Ignore groups not matching the criteria
          }
        }
        // Extract name from tvg-name
        const name = nameMatch ? nameMatch[1] : 'Unknown';
        // Store name and url
        if (currentGroup && currentGroup.startsWith('VOD') && (currentGroup.includes('FRENCH') || currentGroup.endsWith('[FR]'))) {
          groups[currentGroup].push({ name: name }); // Store name temporarily, URL will be added in next iteration
        }
      } else if (!line.startsWith('#') && line.trim() !== '') {
        if (currentGroup && currentGroup.startsWith('VOD') && (currentGroup.includes('FRENCH') || currentGroup.endsWith('[FR]'))) {
          const lastIndex = groups[currentGroup].length - 1;
          if (lastIndex >= 0) {
            groups[currentGroup][lastIndex].url = line.trim(); // Add URL to the last added item
          }
        }
      }
    }
    return groups;
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setM3uContent(content);
        const parsed = parseM3U(content);
        setParsedData(parsed);
        setSelectedGroups(Object.keys(parsed).reduce((acc, group) => {
          acc[group] = false; // Initialize all groups as unchecked
          return acc;
        }, {}));
      };
      reader.readAsText(file);
    }
  };

  const handleGroupButtonClick = (group) => () => {
    const updatedSelectedGroups = {
      ...selectedGroups,
      [group]: !selectedGroups[group], // Toggle selection
    };
    setSelectedGroups(updatedSelectedGroups);
    updateFilteredUrls(updatedSelectedGroups); // Update URLs immediately
  };

  const updateFilteredUrls = (currentSelectedGroups) => {
    const selectedGroupNames = Object.keys(currentSelectedGroups).filter(group => currentSelectedGroups[group]);
    let allGroupData = [];
    selectedGroupNames.forEach(groupName => {
      if (parsedData && parsedData[groupName]) {
        allGroupData = allGroupData.concat(parsedData[groupName]);
      }
    });

    const sortedUrls = allGroupData.sort((a, b) => displayFileName(a.name).localeCompare(displayFileName(b.name)));
    setFilteredUrls(sortedUrls);
  };


  const displayGroupName = (groupName) => {
    let displayedName = groupName;
    if (groupName.startsWith('VOD - ')) {
      displayedName = groupName.substring(6); // Remove "VOD - " prefix
    }
    if (displayedName.endsWith(' [FR]')) {
      displayedName = displayedName.substring(0, displayedName.length - 5); // Remove " [FR]" suffix
    }
    return displayedName;
  };

  const displayFileName = (fileName) => {
    if (fileName.startsWith('FR - ')) {
      return fileName.substring(5);
    }
    return fileName;
  };

  const sortedGroupKeys = useMemo(() => {
    if (parsedData) {
      return Object.keys(parsedData).sort((a, b) => displayGroupName(a).localeCompare(displayGroupName(b)));
    }
    return [];
  }, [parsedData]);


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ margin: '0 10px 0 0' }}>fichier m3u</h3>
        <input type="file" accept=".m3u" onChange={handleFileChange} />
      </div>

      {parsedData && (
        <div style={{ marginTop: '20px' }}>
          <h1>Genres</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {sortedGroupKeys.map((group) => (
              <button
                key={group}
                onClick={handleGroupButtonClick(group)}
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: selectedGroups[group] ? '#e0e0e0' : 'white',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {displayGroupName(group)}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredUrls.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h1>Films</h1>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: 0, listStyleType: 'none' }}>
            {filteredUrls.map((groupData, index) => (
              <li key={index}>
                <a href={groupData.url} target="_blank" rel="noopener noreferrer">
                  {displayFileName(groupData.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
