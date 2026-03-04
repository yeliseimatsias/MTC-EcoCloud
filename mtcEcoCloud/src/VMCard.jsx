const VMCard = ({ vm }) => {
  return (
    <div className="vm-card">
      <div className="vm-card__name">VM: {vm.name}</div>
      <div className="vm-card__specs">
        <div className="vm-card__spec">CPU: {vm.cpu} vCPU ({vm.cpuUsage}%)</div>
        <div className="vm-card__spec">RAM: {vm.ram}GB ({vm.ramUsed}GB used)</div>
        <div className="vm-card__spec">Диск: {vm.disk}GB ({vm.diskType})</div>
      </div>
      <div className={`vm-card__status vm-card__status--${vm.status}`}>
        {vm.statusText}
      </div>
    </div>
  );
};

export default VMCard