
const NoticeBoard = () => {
  return (


        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="bg-[#BDD292] text-black rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Project Group – PMS using REACT</h2>
            <p className="text-lg mb-1 font-bold">08 July 2025</p>
            <h3 className="text-lg font-bold mb-3 mt-4">Final Review Meeting & Submission Deadline</h3>

            <p className="mb-2">
              This is to inform all members of the <strong>Project Team</strong> that the 
              <strong> final project review meeting</strong> has been scheduled as follows:
            </p>

            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Date:</strong> Thursday, 10 July 2025</li>
              <li><strong>Time:</strong> 4:00 PM - 5:30 PM</li>
              <li><strong>Venue:</strong> Conference Room B / Google Meet (link will be shared separately)</li>
              <li><strong>Attendees:</strong> All Phoenix project members, Project Manager, and QA Lead</li>
            </ul>

            <h4 className="mt-4 font-semibold text-md">Key Agenda:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Final status updates and deliverables</li>
              <li>Code and documentation review</li>
              <li>Deployment readiness</li>
              <li>Q&A and feedback</li>
            </ul>

            <h4 className="mt-4 font-semibold text-md">Important:</h4>
            <p className="text-sm mt-2">
              Please ensure <strong>all documentation, reports, and codebase</strong> are finalized and submitted to the shared project drive by 
              <strong> 9 July 2025 (EOD)</strong>.
            </p>

            <p className="text-sm mt-2">
              Failure to meet the deadline may result in delayed deployment and affect performance reviews.
            </p>

            <p className="text-sm mt-2">
              For any clarifications, contact the Project Manager directly at
              <a href="mailto:suvrajit1@gmail.com" className="text-blue-800 underline ml-1">suvrajit1@gmail.com</a>.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-sm">Regards,</p>
              <p className="font-bold text-sm">SUVRAJIT DAS</p>
              <p className="text-sm">Project Coordinator<br />JPMS Pvt. Ltd.</p>
            </div>
          </div>
        </main>

  );
};

export default NoticeBoard;