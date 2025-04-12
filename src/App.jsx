import React, { useState } from 'react';

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
      } else if (!line.startsWith('#') && line.trim() !== '') {
        if (currentGroup && currentGroup.startsWith('VOD') && (currentGroup.includes('FRENCH') || currentGroup.endsWith('[FR]'))) {
          groups[currentGroup].push(line.trim());
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

  const handleGroupCheckboxChange = (group) => (event) => {
    setSelectedGroups({
      ...selectedGroups,
      [group]: event.target.checked,
    });
  };

  const handleGoClick = () => {
    const selectedGroupNames = Object.keys(selectedGroups).filter(group => selectedGroups[group]);
    let urls = [];
    selectedGroupNames.forEach(groupName => {
      if (parsedData && parsedData[groupName]) {
        urls = urls.concat(parsedData[groupName]);
      }
    });
    setFilteredUrls(urls);
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


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>M3U Parser and Filter</h1>

      <input type="file" accept=".m3u" onChange={handleFileChange} />

      {parsedData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Filter by Group Title</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(parsedData).map((group) => (
              <label key={group} style={{ margin: '5px 0' }}>
                <input
                  type="checkbox"
                  checked={selectedGroups[group] || false}
                  onChange={handleGroupCheckboxChange(group)}
                />
                {displayGroupName(group)}
              </label>
            ))}
          </div>
          <button onClick={handleGoClick} style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer' }}>
            GO
          </button>
        </div>
      )}

      {filteredUrls.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>URLs for Selected Groups</h2>
          <ul>
            {filteredUrls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
