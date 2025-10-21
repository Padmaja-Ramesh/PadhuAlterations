import Services from '../features/Services';

function Home() {
  // let alterations = [
  //   'Pant Alterations',
  //   'Outwear Alterations',
  //   'Shirt Alterations',
  //   'SuitJacket Alterations',
  //   'Skirt Alterations',
  //   'Custom Alterations',
  //   'Shorts Alterations',
  //   'Leather Alterations',
  // ];
  return (
    <>
      <div className="item3">
        <div>
          <h2>List of Alterations</h2>
        </div>
        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {alterations.map((a, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '30px 30px',
                }}
              >
                <h4>{a}</h4>
              </div>
            );
          })}
        </div> */}
        <Services />
      </div>
    </>
  );
}

export default Home;
