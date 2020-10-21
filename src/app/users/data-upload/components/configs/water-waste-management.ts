import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SolidWasteManagementDocuments } from '../../models/financial-data.interface';

type fileKeys = keyof SolidWasteManagementDocuments;

const QuestionsIdMapping: { [key in fileKeys]: string } = {
  garbageFreeCities: "Garbage free star rating of the cities",
  waterSupplyCoverage: "Coverage of water supply for public/community toilets.",
};

let documentForm: FormGroup;
const _fb = new FormBuilder();

documentForm = _fb.group({
  garbageFreeCities: [null, [Validators.required]],
  waterSupplyCoverage: [null, [Validators.required]],
});

export { QuestionsIdMapping, documentForm };
