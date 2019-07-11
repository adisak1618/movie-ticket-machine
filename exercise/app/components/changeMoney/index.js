export default ({ change = [] }) => <div>
  {
    change.map((banknote, index) => {
      return <img key={`${banknote}-${index}`} className={banknote > 10 ? '': 'coin'} src={`/images/bank/${banknote}.${banknote > 10 ? 'jpg': 'png'}`} />;
    })
  }
</div>