export default function Education() {
    return (
      <section id="education" className="py-20 px-8">
        <h1 className="text-5xl font-bold text-center mb-12">
          Education
        </h1>
  
        <div className="max-w-4xl mx-auto space-y-8">
  
          {/* College */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Bachelor of Technology (B.Tech)
                </h2>
                <p className="text-lg text-gray-600">
                  Computer Science and Engineering
                </p>
                <p className="text-gray-500">
                  Specialization in Artificial Intelligence & Machine Learning
                </p>
              </div>
  
              <p className="font-semibold mt-4 md:mt-0">
                2024 – 2028
              </p>
            </div>
          </div>
  
          {/* School */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Higher Secondary Education
                </h2>
                <p className="text-lg text-gray-600">
                  Computer Science
                </p>
              </div>
  
              <p className="font-semibold mt-4 md:mt-0">
                Completed
              </p>
            </div>
          </div>
  
        </div>
      </section>
    );
  }
