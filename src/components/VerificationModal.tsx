import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Sparkles,
  Camera,
  CheckCircle2,
  ScanFace,
  FileCheck2,
  Lock,
} from 'lucide-react';

export const VerificationModal: React.FC = () => {
  const {
    showVerificationModal,
    setShowVerificationModal,
    currentUser,
    completeVerification,
  } = useApp();

  const [activeStep, setActiveStep] = useState<'person' | 'id'>('person');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('请正对镜头并眨眼');

  // Real name form
  const [realName, setRealName] = useState('');
  const [idNumber, setIdNumber] = useState('');

  if (!showVerificationModal) return null;

  const handleStartFaceScan = () => {
    setIsScanning(true);
    setScanStepText('请将脸部置于识别框内...');
    setTimeout(() => {
      setScanStepText('正在进行活体检测：请缓慢眨眼...');
    }, 1200);
    setTimeout(() => {
      setScanStepText('面部特征与头像智能比对通过！');
    }, 2500);
    setTimeout(() => {
      setIsScanning(false);
      completeVerification('real_person');
    }, 3200);
  };

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realName.trim() || idNumber.length < 6) return;
    completeVerification('real_name', realName, idNumber);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-emerald-100 animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-200" />
            <div>
              <h3 className="text-base sm:text-lg font-black">约在一起 · 官方安全认证中心</h3>
              <p className="text-xs text-emerald-100">杜绝虚假与照骗，认证可获 +250 积分奖励</p>
            </div>
          </div>
          <button
            onClick={() => setShowVerificationModal(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-zinc-200 bg-zinc-50">
          <button
            onClick={() => setActiveStep('person')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeStep === 'person'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <ScanFace className="w-4 h-4" />
            <span>真人活体认证 (+100分)</span>
            {currentUser.verification.isRealPerson && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full">
                已通过
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveStep('id')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeStep === 'id'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>公安实名认证 (+150分)</span>
            {currentUser.verification.isRealName && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full">
                已通过
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto">
          {activeStep === 'person' ? (
            <div className="space-y-4 text-center">
              {currentUser.verification.isRealPerson ? (
                <div className="py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-zinc-900">您已成功通过真人活体审核</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    您的个人主页已点亮官方【真人实拍】勋章，在同城和老乡推荐列表中将获得优先展示推荐！
                  </p>
                </div>
              ) : isScanning ? (
                <div className="py-6 space-y-4">
                  {/* Face scan animation viewfinder */}
                  <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-dashed border-emerald-500 flex items-center justify-center overflow-hidden bg-zinc-900">
                    <img
                      src={currentUser.avatar}
                      alt="user"
                      className="w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 h-1 bg-emerald-400 top-1/3 animate-bounce shadow-md shadow-emerald-400" />
                    <ScanFace className="w-12 h-12 text-white/80 absolute" />
                  </div>

                  <div className="text-sm font-bold text-emerald-700 animate-pulse">
                    {scanStepText}
                  </div>
                  <div className="text-xs text-zinc-400">正在与微信及相册人脸建模实时核验中...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <Camera className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="text-base font-black text-zinc-900">活体人脸检测</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      系统将调用智能活体识别，确保交友照片为本人实拍，杜绝网络盗图、网图照骗。
                    </p>
                  </div>

                  <div className="bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200 text-left text-xs space-y-2 text-zinc-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>通过后主页点亮「真人认证」闪耀标示</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>立得 +100 积分奖励，可直接用于私聊或解锁微信号</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>人脸数据仅用于特征比对，平台严格加密不予公开</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartFaceScan}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition"
                  >
                    开始真人活体检测
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {currentUser.verification.isRealName ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-zinc-900">公安系统实名认证已通过</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    已确认认证信息为【{currentUser.name}】，身份证信息已安全脱敏加密。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleIdSubmit} className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-base font-black text-zinc-900">身份信息实名核验</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      通过公安部门实名数据库核对真实姓名与身份证件
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">真实姓名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="请输入身份证上的真实姓名（如：陈浩宇）"
                      value={realName}
                      onChange={(e) => setRealName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      身份证号码（前6位及后4位校验）*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="请输入18位居民身份证号码"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                    🛡️ <span className="font-bold">隐私保障说明：</span>
                    根据《网络安全法》规定，实名信息仅用于核实账号真实性。姓名将以
                    “陈**” 形式脱敏展示，身份证号码绝不向任何第三方或用户泄露。
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition"
                  >
                    提交实名核验 (+150积分)
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
