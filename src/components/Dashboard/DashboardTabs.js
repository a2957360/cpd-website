import React from 'react';

const DashboardTabs = (props) => {
  const { tabs, currentTab, setCurrentTab } = props;

  return (
    <div className='d-flex dashboard-tabs-wrapper hide-on-mobile'>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-container text-center ${
            currentTab === tab.key ? 'tab-container-active' : ''
          }`}
          onClick={() => setCurrentTab(tab.key)}
        >
          <span className='fs-16'>{tab.title}</span>
        </div>
      ))}
    </div>
  );
};

export default DashboardTabs;
