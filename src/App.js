import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const GameDevDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // 프로젝트 데이터
  const projectData = {
    title: "1-1차 빌드",
    version: "0.1.0",
    status: "진행 중",
    summary: "메인허드/스토리모드/해금",
    overallProgress: 75,
  };

  // 팀별 진행률 데이터
  const teamProgress = [
    {
      team: "클라이언트",
      progress: 20,
      color: "#3B82F6",
      tasks: 5,
      completed: 1,
    },
    { team: "서버", progress: 100, color: "#10B981", tasks: 1, completed: 1 },
    { team: "기획", progress: 80, color: "#F59E0B", tasks: 5, completed: 4 },
    { team: "아트", progress: 0, color: "#EF4444", tasks: 0, completed: 0 },
  ];

  // 메인 태스크 데이터
  const mainTasks = [
    {
      name: "로그인",
      status: "진행중",
      progress: 0,
      team: "클라이언트",
      priority: "high",
    },
    {
      name: "피디생성",
      status: "완료",
      progress: 100,
      team: "서버",
      priority: "medium",
    },
    {
      name: "메인허드",
      status: "완료",
      progress: 100,
      team: "모든팀",
      priority: "high",
    },
    {
      name: "스토리모드",
      status: "완료",
      progress: 100,
      team: "모든팀",
      priority: "high",
    },
    {
      name: "해금",
      status: "완료",
      progress: 100,
      team: "모든팀",
      priority: "medium",
    },
    {
      name: "아이템보관함",
      status: "완료",
      progress: 100,
      team: "모든팀",
      priority: "low",
    },
  ];

  // 서브 태스크 데이터
  const subTasks = [
    {
      name: "로그인/회원가입/예외처리",
      assignee: "김학영",
      dueDate: "2025-05-26",
      status: "진행중",
      team: "클라이언트",
    },
    {
      name: "아이돌 생성 기획",
      assignee: "류은총",
      dueDate: "완료",
      status: "완료",
      team: "기획",
    },
    {
      name: "아이돌 의상 컨셉 정리",
      assignee: "류은총",
      dueDate: "완료",
      status: "완료",
      team: "기획",
    },
    {
      name: "의상 및 악세서리 슬롯 정리",
      assignee: "류은총",
      dueDate: "완료",
      status: "완료",
      team: "기획",
    },
    {
      name: "캐릭터 생성 UI 기획",
      assignee: "정연규",
      dueDate: "완료",
      status: "완료",
      team: "기획",
    },
    {
      name: "의상 이펙트 연출 기획",
      assignee: "류은총",
      dueDate: "진행중",
      status: "진행중",
      team: "기획",
    },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  // 차트 데이터
  const progressData = teamProgress.map((team) => ({
    name: team.team,
    진행률: team.progress,
    완료태스크: team.completed,
    전체태스크: team.tasks,
  }));

  const statusData = [
    {
      name: "완료",
      value: mainTasks.filter((t) => t.status === "완료").length,
      color: "#10B981",
    },
    {
      name: "진행중",
      value: mainTasks.filter((t) => t.status === "진행중").length,
      color: "#F59E0B",
    },
    {
      name: "대기",
      value: mainTasks.filter((t) => t.status === "대기").length,
      color: "#EF4444",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800";
      case "진행중":
        return "bg-yellow-100 text-yellow-800";
      case "대기":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                🎮 {projectData.title}
              </h1>
              <p className="text-blue-100 text-lg">{projectData.summary}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  v{projectData.version}
                </span>
                <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium">
                  {projectData.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {projectData.overallProgress}%
              </div>
              <div className="text-blue-100">전체 진행률</div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", name: "📊 개요", icon: "📊" },
              { id: "tasks", name: "📋 태스크", icon: "📋" },
              { id: "team", name: "👥 팀 현황", icon: "👥" },
              { id: "timeline", name: "⏰ 타임라인", icon: "⏰" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 콘텐츠 */}
      {selectedTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 팀별 진행률 차트 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">팀별 진행률</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="진행률" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 태스크 상태 파이차트 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">태스크 상태 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 팀 현황 카드들 */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">팀별 상세 현황</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamProgress.map((team, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow border-l-4"
                  style={{ borderLeftColor: team.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{team.team}</h4>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: team.color }}
                    >
                      {team.progress}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    완료: {team.completed} / {team.tasks}
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: team.color,
                        width: `${team.progress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "tasks" && (
        <div className="space-y-6">
          {/* 메인 태스크 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">📋 메인 태스크</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {mainTasks.map((task, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg border-l-4 ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-gray-600">
                          담당: {task.team}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {task.progress}%
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 서브 태스크 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">📝 서브 태스크</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      태스크
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      담당자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      팀
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      마감일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subTasks.map((task, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.assignee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "team" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">👨‍💻 클라이언트팀</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">김학영</span>
                <span className="text-sm text-gray-600">
                  로그인 시스템 개발
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">📋 기획팀</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">류은총</span>
                <span className="text-sm text-gray-600">캐릭터/의상 기획</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">정연규</span>
                <span className="text-sm text-gray-600">UI 기획</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">🖥️ 서버팀</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">서버 개발자</span>
                <span className="text-sm text-gray-600">피디 생성 완료</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">🎨 아트팀</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">아트 팀원</span>
                <span className="text-sm text-gray-600">작업 대기중</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "timeline" && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">⏰ 프로젝트 타임라인</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div className="ml-4">
                <div className="font-medium">2025년 5월 25일</div>
                <div className="text-sm text-gray-600">
                  프로젝트 시작 - 1-1차 빌드 작업 개시
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div className="ml-4">
                <div className="font-medium">진행 완료</div>
                <div className="text-sm text-gray-600">
                  메인허드, 스토리모드, 해금, 아이템보관함 기능 완료
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
              <div className="ml-4">
                <div className="font-medium">2025년 5월 26일 (진행중)</div>
                <div className="text-sm text-gray-600">
                  로그인/회원가입 시스템 개발 중 (김학영)
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
              <div className="ml-4">
                <div className="font-medium">예정</div>
                <div className="text-sm text-gray-600">
                  아트 작업 및 최종 통합 테스트
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDevDashboard;
