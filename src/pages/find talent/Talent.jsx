import './style.css'
import FindtalentSec1 from '../../component/FindtalentSec1'
import FindtalentSec2 from '../../component/FindtalentSec2'
import PublishModal from '../../component/PublishModal'
import SubmissionModal from '../../component/SubmissionModal'

const Index = ({SetJobPosterData}) => {
  return (
    <div className='container talenter' >
      <FindtalentSec1 SetJobPosterData={SetJobPosterData}/>
      <FindtalentSec2/>
      {/* <PublishModal /> */}
      {/* <SubmissionModal/> */}
    </div>
  )
}

export default Index