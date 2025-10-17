function Home() {
  let alterations = [
    'Pant Alterations',
    'Outwear Alterations',
    'Shirt Alterations',
    'SuitJacket Alterations',
    'Skirt Alterations',
    'Custom Alterations',
    'Shorts Alterations',
    'Leather Alterations',
  ];
  return (
    <>
      <div className="item3">
        <div>
          <h1>List of Alterations</h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {alterations.map((a) => {
            return (
              <grid
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '30px 30px',
                }}
              >
                <h4>{a}</h4>
              </grid>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
