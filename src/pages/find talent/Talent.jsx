import './style.css'
import FindtalentSec1 from '../../components/FindtalentSec1'
import FindtalentSec2 from '../../components/FindtalentSec2'
import PublishModal from '../../components/PublishModal'
import SubmissionModal from '../../components/SubmissionModal'

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