/* T2Fb: согласованный генератор случайных наборов из всех 32 полей. */
const T2FB_RANDOMIZER = (() => {
  function pick(xs) { return xs[Math.floor(Math.random() * xs.length)]; }
  function randomize(subjectType, catalog) {
    const params=Object.fromEntries(catalog.params.map(p=>[p.key,p]));
    function opt(key,index) {
      const item=params[key].options[index];
      if (!item) throw Error('Нет варианта '+key+'/'+index);
      return item.value;
    }
    function selected(key,indices) { return opt(key,pick(indices)); }
    const isPerson=subjectType!=='object';
    const scene=pick(isPerson?['studio','window','overcast','golden','street']:['studio','window','overcast']);
    const preset = isPerson ? ({
      studio: 'PORTRAIT_EDITORIAL', window:'PORTRAIT_EDITORIAL',
      overcast:'BASE_NEUTRAL', golden:'PORTRAIT_EDITORIAL', street:'STREET_DOCUMENTARY'
    }[scene]) : ({
      studio:'PRODUCT_STUDIO',window:'ARCH_INTERIOR_DAY',
      overcast:'BASE_NEUTRAL'
    }[scene]);
    const environment={studio:0,window:2,overcast:1,golden:3,street:5};
    const lights={studio:[0],window:[1,2],overcast:[3],golden:[4],street:[5]};
    const softness={studio:[0,1,4],window:[0,1,4],overcast:[0,1],golden:[2,3],street:[1,2]};
    const fill={studio:[1,2,4],window:[2,4],overcast:[4,5],golden:[2,3],street:[3,5]};
    const white={studio:[0,1],window:[0,1],overcast:[4],golden:[2,3],street:[3]};
    const reflections={studio:[0],window:[1],overcast:[2],golden:[2],street:[2]};
    const values={};
    values.scene_subject=opt('scene_subject',subjectType==='student'?0:subjectType==='adult'?1:pick([2,3]));
    values.photo_intent=selected('photo_intent',isPerson?({
      studio:[0,2],window:[0,1,2],overcast:[1,3],golden:[1,2],street:[3,4]
    }[scene]):(scene==='studio'?[5]:scene==='window'?[6]:[1,6]));
    values.sensor_camera=selected('sensor_camera',isPerson?(scene==='street'?[0,1,2,4]:[0,1,2,4]):[0,1,3]);
    const sensor=values.sensor_camera;
    values.focal_mm=sensor==='smartphone'?opt('focal_mm',5):
      sensor==='MFT'?pick(['25','42.5']):
      sensor==='APS-C'?pick(['35','50','56']):
      sensor==='medium-format'?pick(['50','85']):pick(isPerson?['35','50','85']:['35','50','85','105']);
    values.aperture=sensor==='smartphone'?opt('aperture',5):
      selected('aperture',isPerson?[1,2,3,4]:[2,3,4]);
    values.focus_distance=selected('focus_distance',isPerson?[0,1,2]:[3,4,5]);
    values.shutter=sensor==='smartphone'?opt('shutter',5):
      selected('shutter',scene==='street'?[0,2,5]:[0,1,5]);
    values.iso=sensor==='smartphone'?opt('iso',6):
      selected('iso',scene==='street'?[2,3,4,6]:scene==='golden'?[1,2,3,6]:[0,1,2,6]);
    values.camera_pose=selected('camera_pose',isPerson?[0,1,4]:[0,1,2]);
    values.view_angle=selected('view_angle',isPerson?[0,1,2,3]:[0,1,4]);
    values.composition_aspect=selected('composition_aspect',isPerson?[0,1]:[2,6]);
    values.dof_bokeh=selected('dof_bokeh',sensor==='smartphone'?[0,1,3]:isPerson?[0,1,4]:[0,1]);
    values.environment_time=opt('environment_time',environment[scene]);
    values.key_light=selected('key_light',lights[scene]);
    values.source_size_softness=selected('source_size_softness',softness[scene]);
    values.fill_ratio=selected('fill_ratio',fill[scene]);
    values.rim_practical=selected('rim_practical',scene==='studio'?[0,1]:scene==='window'?[0,3]:scene==='street'?[0,2]:[0]);
    values.light_color_wb=selected('light_color_wb',white[scene]);
    values.environment_reflections=selected('environment_reflections',reflections[scene]);
    values.material_class=isPerson?selected('material_class',[0,1]):
      'классы материалов сохранить из исходного 3D-рендера, без подмены';
    values.roughness_specular=isPerson?selected('roughness_specular',[0,1]):
      'характер бликов сохранить по материалам исходника; естественная пространственная неоднородность';
    values.ior_metal_transmission=selected('ior_metal_transmission',isPerson?[0,3]:[3]);
    values.micro_surface=selected('micro_surface',isPerson?[0,1,2]:[2]);
    values.edge_geometry=selected('edge_geometry',isPerson?[0]:[2,3]);
    values.texture_variation_wear=selected('texture_variation_wear',isPerson?[0,1,2]:[1,2,3]);
    values.integrator_sampling=opt('integrator_sampling',0);
    values.contact_shadows_gi=selected('contact_shadows_gi',isPerson?[0,1,3]:[0,2,3]);
    values.atmosphere_volumes=selected('atmosphere_volumes',scene==='street'?[0,1,2]:[0,1]);
    values.color_management=selected('color_management',[0,5]);
    values.exposure_tone=selected('exposure_tone',scene==='street'?[0,2,3,4]:[0,1,3,4]);
    values.lens_sensor_artifacts=selected('lens_sensor_artifacts',scene==='street'?[0,2,4]:[0,1,3,4]);
    values.post_output=selected('post_output',sensor==='smartphone'?[3]:isPerson?[0,1,2]:[0,2]);
    const keys=catalog.params.map(p=>p.key);
    if (keys.some(k=>!values[k] || typeof values[k]!=='string'))
      throw Error('Не заполнены параметры генерации');
    return {preset,scene,values};
  }
  return {randomize};
})();